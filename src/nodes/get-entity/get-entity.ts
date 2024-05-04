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
    
   /* const credentials = {
      url:  RED.settings.get('GROCY_URL'),
      key:  RED.settings.get('GROCY_KEY')
    }*/

    //console.warn('SET URL :'+ credentials.url)
    this.on('input', (msg, send, done) => {
      const payload = msg.payload as GetEntityOptions

      const credentialsToUse = {
        url: this.server.url,
        key: this.server.gkey,
      }

      if(credentialsToUse.key == ''){
        this.error("Failed to get url, either set in node or pass via payload.key");
        done();
      }

      if(credentialsToUse.url == ''){
        this.error("Failed to get url, either set in node or pass via payload.url");
        done();
      }

      if (typeof payload?.entity_type == 'string') {
        const url = `${credentialsToUse.url}/api/objects/${payload.entity_type}`; // Adjust if your Grocy API endpoint differs
        
/*            axios.put(url, {
              headers: {
                'GROCY-API-KEY': credentialsToUse.key,
                'Accept': 'application/json'
              }
            })
            .then(response => {
              msg.payload = response.data; // Attach API response to the output message
              send(msg);
              done();
            })
            .catch(error => {
              this.error(`Failed to PUT "${payload.entity_type}" (${url}): [server:${JSON.stringify(this.server)}] ` + error.message);
              done();
            });
            done();
            break;
          default:
          case 'GET': */
            axios.get(url, {
              headers: {
                'GROCY-API-KEY': credentialsToUse.key,
                'Accept': 'application/json'
              }
            })
            .then(response => {
              msg.payload = response.data; // Attach API response to the output message
              send(msg);
              done();
            })
            .catch(error => {
              this.error(`Failed to GET "${payload.entity_type}" (${url}):  \n\n${error.message} \n\n[server:${JSON.stringify(this.server, null, 4)}]`);
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
