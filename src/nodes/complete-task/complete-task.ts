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
      if(!this.task_id || this.task_id == 0){
        this.error('Failed due to missing task_id')
        done()
        return;
      }
      const payload = msg.payload

        const url = `${this.server.url}/api/tasks/${this.task_id}/${config.complete ? 'complete' : 'undo'}`; // Adjust if your Grocy API endpoint differs
        
        axios.post(url, payload, {
          headers: {
            'GROCY-API-KEY': this.server.gkey,
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
          },
        })
        .then(response => {
          msg.payload = response.data;
          send(msg);
          done();
        })
        .catch(error => {
          this.error(`Failed to post task_id:(${url}) \n\n(payload:${JSON.stringify(payload, null, 4)}) \n\nconfig:${JSON.stringify(config, null, 4)}: \n\n[error:${JSON.stringify(error, null, 4)}]`);
          done();
        });
        done();
    });

    this.on("close", (done: () => void) => {
      console.log("Cleaning up resources...");
      if (done) done(); 
    });
  }

  RED.nodes.registerType("complete-task", GetEntityNodeConstructor);
};

export = nodeInit;
