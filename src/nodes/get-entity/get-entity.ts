import { NodeInitializer } from "node-red";
import { GetEntityNode, GetEntityNodeDef } from "./modules/types";
import axios from 'axios'
import { GrocyConfigNodeDef } from "../grocy-config/modules/types";

interface Payload {
  entity_type: string
}

const requiredKeys = ['entity_type']

const nodeInit: NodeInitializer = (RED): void => {
  function GetEntityNodeConstructor(
    this: GetEntityNode,
    nodeConfig: GetEntityNodeDef
  ): void {
    RED.nodes.createNode(this, nodeConfig);
    this.on("input", (rawMsg, send, done) => {
      const payload = rawMsg.payload as unknown as Payload;


      const cNode = RED.nodes.getNode('grocy-config') as unknown as GrocyConfigNodeDef

      if(cNode) {

        const missingKeys = requiredKeys.filter((rk) => !Object.keys(payload).some((p) => p == rk))
        if(missingKeys.length > 0){
          this.error(`${missingKeys.reduce((a, b) => `${a},${b}`, 'Keys Missing: ')}`);
        }

        if (payload?.entity_type) {
          const url = `${cNode.url}/${payload.entity_type}`; // Adjust if your Grocy API endpoint differs
      
          axios.get(url, {
            headers: {
              'GROCY-API-KEY': cNode.apiKey,
              'Accept': 'application/json'
            }
          })
          .then(response => {
            rawMsg.payload = response.data; // Attach API response to the output message
            send(rawMsg);
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
      } else {
        this.error("this.server is undefined");
        done();
      }
    });
  }

  RED.nodes.registerType("get-entity", GetEntityNodeConstructor);
};

export = nodeInit;
