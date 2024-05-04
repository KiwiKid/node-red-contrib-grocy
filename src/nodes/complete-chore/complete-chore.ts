import { EditorRED, NodeInitializer } from "node-red";
import { CompleteChoreNode, CompleteChoreNodeDef } from "./modules/types";
import axios from 'axios'
import { CompleteChoreOptions } from "./shared/types";
import { GrocyConfigNode } from "../shared/types";

declare const RED: EditorRED;

const nodeInit: NodeInitializer = (RED): void => {
  function GetEntityNodeConstructor(
    this: CompleteChoreNode,
    config: CompleteChoreNodeDef
  ): void {
    RED.nodes.createNode(this, config);
    this.server = RED.nodes.getNode(config.server) as GrocyConfigNode
    this.on('input', (msg, send, done) => {
      const payload = msg.payload as CompleteChoreOptions

        const url = `${this.server.url}/chores/${payload.chore_id}/execute`;
        
        axios.post(url, {
          headers: {
            'GROCY-API-KEY': this.server.gkey,
            'Accept': 'application/json'
          }
        })
        .then(response => {
          msg.payload = response.data;
          send(msg);
          done();
        })
        .catch(error => {
          this.error(`Failed to PUT task_id:"${payload.chore_id}" complete (${url}): [server:${JSON.stringify(this.server)}] ` + error.message);
          done();
        });
        done();
    });

    this.on("close", (done: () => void) => { 
      console.log("Cleaning up resources...");
      if (done) done();
    });
  }

  RED.nodes.registerType("complete-chore", GetEntityNodeConstructor);
};

export = nodeInit;
