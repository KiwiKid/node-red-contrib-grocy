import { EditorRED, NodeInitializer } from "node-red";
import { CompleteTaskNode, CompleteTaskNodeDef } from "./modules/types";
import axios from 'axios'
import { CompleteTaskOptions } from "./shared/types";
import { GrocyConfigNode } from "../shared/types";

declare const RED: EditorRED;

const nodeInit: NodeInitializer = (RED): void => {
  function GetEntityNodeConstructor(
    this: CompleteTaskNode,
    config: CompleteTaskNodeDef
  ): void {
    RED.nodes.createNode(this, config);


    this.server = RED.nodes.getNode(config.server) as GrocyConfigNode
    
   /* const credentials = {
      url:  RED.settings.get('GROCY_URL'),
      key:  RED.settings.get('GROCY_KEY')
    }*/

    //console.warn('SET URL :'+ credentials.url)
    this.on('input', (msg, send, done) => {
      const payload = msg.payload

        const url = `${this.server.url}/api/tasks/${this.task_id}/${this.complete ? 'complete' : 'undo'}`; // Adjust if your Grocy API endpoint differs
        
        axios.post(url, payload, {
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
          this.error(`Failed to PUT task_id:"${this.task_id}" complete:${this.complete} (${url}): [server:${JSON.stringify(this.server)}] ` + error.message);
          done();
        });
        done();
    });

    this.on("close", (done: () => void) => { // Ensure 'done' is used if it's provided.
      console.log("Cleaning up resources...");
      if (done) done(); // Call 'done' if there are async tasks.
    });
  }

  RED.nodes.registerType("complete-task", GetEntityNodeConstructor);
};

export = nodeInit;
