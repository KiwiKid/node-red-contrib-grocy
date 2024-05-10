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
      node.log('get-entity')
      node.log('payload')
      node.log(JSON.stringify(msg.payload))
      node.log('config')
      node.log(JSON.stringify(config, null, 4))
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
            done()
            return;
          }
        })
      }
      const url = `${node.server.url}/api/objects/${node.entity_type}${node.entity_id ? `/${node.entity_id}` : ''}?${QueryString.stringify(msg.payload)}`; 
      node.log(`get-url: ${url}`)
      axios.get(url, {
        headers: {
          'GROCY-API-KEY': node.server.gkey,
          'Accept': 'application/json'
        }
      })
      .then(response => {
        msg.payload = {
          data: response.data,
          config: config,
          node: node,
        }
        send(msg);
        done();
      })
      .catch(error => {
        this.error(`Failed to post task_id:(${url}) \n\n===payload===\n:${JSON.stringify(msg.payload, null, 4)}) \n\n====config====\n:${JSON.stringify(config, null, 4)}: \n\n===error===:\n${JSON.stringify(error, null, 4)}] \n\n====this:==== \n${JSON.stringify(this)}`);
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
