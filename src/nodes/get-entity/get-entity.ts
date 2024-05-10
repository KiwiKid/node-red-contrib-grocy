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
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    this.entity_type = config.entity_type;
    this.entity_id = config.entity_id;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const node = this;
    node.on('input', (msg, send, done) => {
      if(msg.payload){
        Object.keys(msg?.payload).forEach((k) => {
          if(![
            'query',
            'order',
            'limit',
            'offset',
          ].includes((k))){
            node.log(`${k} in payload is not supported`)
            this.error(`${k} in payload is not supported`)
            if(done){
              done()
            }
            
            return;
          }
        })
      }
      const url = `${node.server.url}/api/objects/${node.entity_type}${node.entity_id ? `/${node.entity_id}` : ''}?${QueryString.stringify(msg.payload)}`; 
      axios.get(url, {
        headers: {
          'GROCY-API-KEY': node.server.gkey,
          'Accept': 'application/json'
        }
      })
      .then(response => {
        msg.payload = response.data,
        send(msg);
        if(done){
          done();
        }
        
      })
      .catch(error => {
        this.error(`Failed to post task_id:(${url}) \n\n===payload===\n:${JSON.stringify(msg.payload, null, 4)}) \n\n====config====\n:${JSON.stringify(config, null, 4)}: \n\n===error===:\n${JSON.stringify(error, null, 4)}] \n\n====this:==== \n${JSON.stringify(this)}`);
        if(done){
          done();
        }
      });

    });

    this.on("close", (done: () => void) => { // Ensure 'done' is used if it's provided.
      if (done) done(); // Call 'done' if there are async tasks.
    });
  }

  RED.nodes.registerType("get-entity", GetEntityNodeConstructor);
};

export = nodeInit;
