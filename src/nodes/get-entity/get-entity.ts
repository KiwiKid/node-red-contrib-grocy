import { NodeInitializer, NodeMessageInFlow } from "node-red";
import { GetEntityNode, GetEntityNodeDef } from "./modules/types";
import axios from 'axios'
import { GetEntityOptions } from "./shared/types";

const nodeInit: NodeInitializer = (RED): void => {
  function GetEntityNodeConstructor(
    this: GetEntityNode,
    config: GetEntityNodeDef
  ): void {
    RED.nodes.createNode(this, config);
    const credentials = {
      url:  RED.settings.get('GROCY_URL'),
      key:  RED.settings.get('GROCY_KEY')
    }

    console.warn('SET URL :'+ credentials.url)
    this.on('input', (msg, send, done) => {

      const payload = msg.payload as GetEntityOptions

      if (typeof payload?.entity_type == 'string') {
        const url = `${credentials.url}/${payload.entity_type}`; // Adjust if your Grocy API endpoint differs
    
        axios.get(url, {
          headers: {
            'GROCY-API-KEY': credentials.key,
            'Accept': 'application/json'
          }
        })
        .then(response => {
          msg.payload = response.data; // Attach API response to the output message
          send(msg);
          done();
        })
        .catch(error => {
          this.error("Failed to retrieve data: " + error.message);
          done();
        });
      } else {
        this.error("No entity_type provided in the payload");
        done();
      }


    });

    this.on("close", (done: () => void) => { // Ensure 'done' is used if it's provided.
      console.log("Cleaning up resources...");
      if (done) done(); // Call 'done' if there are async tasks.
    });
  }

  RED.nodes.registerType("get-entity", GetEntityNodeConstructor);
};

export = nodeInit;
