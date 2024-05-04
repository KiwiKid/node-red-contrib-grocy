import { EditorRED, NodeInitializer, NodeMessageInFlow } from "node-red";
import { GetEntityNode, GetEntityNodeDef } from "./modules/types";
import axios from 'axios'
import { GetEntityOptions } from "./shared/types";
import { GrocyConfigNode } from "../shared/types";

declare const RED: EditorRED;

const nodeInit: NodeInitializer = (RED): void => {
  function GetEntityNodeConstructor(
    this: GetEntityNode,
    config: GetEntityNodeDef
  ): void {
    RED.nodes.createNode(this, config);


    this.server = RED.nodes.getNode(config.server) as GrocyConfigNode
    
    this.on('input', (msg, send, done) => {
      const url = `${this.server.url}/api/objects/${config.entity_type}`; 
      axios.get(url, {
        headers: {
          'GROCY-API-KEY': this.server.gkey,
          'Accept': 'application/json'
        }
      })
      .then(response => {
        msg.payload = response.data; // Attach API response to the output message
        send(msg);
        done();
      })
      .catch(error => {
        this.error(`Failed to GET (${url}):  \n\nerror:\n${error.message} \n\n[server:\n${JSON.stringify(this.server, null, 4)}\n]`);
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
