import { EditorRED, NodeInitializer, NodeMessageInFlow } from "node-red";
import { GetEntityNode, GetEntityNodeDef } from "./modules/types";
import axios from 'axios'
import { GetEntityOptions } from "./shared/types";
import { GrocyConfigNode } from "../shared/types";
import QueryString from "qs";

declare const RED: EditorRED;

const nodeInit: NodeInitializer = (RED): void => {
  function GetEntityNodeConstructor(
    this: GetEntityNode,
    config: GetEntityNodeDef
  ): void {
    RED.nodes.createNode(this, config);
    RED.log.info(`Set Grocy (config:${JSON.stringify(config)})`)
    this.server = RED.nodes.getNode(config.server) as GrocyConfigNode
    
    this.on('input', (msg, send, done) => {
      if(msg.payload){
        Object.keys(msg?.payload).forEach((k) => {
          if(![
            'query',
            'order',
            'limit',
            'offset',
          ].includes((k))){
            this.error(`${k} in payload is not supported`)
            done()
            return;
          }
        })
      }
      const url = `${this.server.url}/api/objects/${this.entity_type}${config.entity_id ? `/${config.entity_id}` : ''}?${QueryString.stringify(msg.payload)}`; 
      axios.get(url, {
        headers: {
          'GROCY-API-KEY': this.server.gkey,
          'Accept': 'application/json'
        }
      })
      .then(response => {
        msg.payload = {
          data: response.data,
          config: config,
        }
        send(msg);
        done();
      })
      .catch(error => {
        this.error(`Failed to post task_id:(${url}) \n\n(payload:${JSON.stringify(msg.payload, null, 4)}) \n\nconfig:${JSON.stringify(config, null, 4)}: \n\n[error:${JSON.stringify(error, null, 4)}]`);
        done();
      });

    });

    this.on("close", (done: () => void) => { // Ensure 'done' is used if it's provided.
      console.log("Cleaning up resources...");
      if (done) done(); // Call 'done' if there are async tasks.
    });
  }

  RED.nodes.registerType("get-entity", GetEntityNodeConstructor);
};

export = nodeInit;
