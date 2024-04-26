import { NodeInitializer } from "node-red";
import { GetEntityNode, GetEntityNodeDef } from "./modules/types";
import axios from 'axios'

interface Payload {
  entity_type: string
  toConfig_baseUrl: string
  toConfig_apiKey: string
}

const requiredKeys = ['entity_type', 'toConfig_baseUrl', 'toConfig_apiKey']

const nodeInit: NodeInitializer = (RED): void => {
  function GetEntityNodeConstructor(
    this: GetEntityNode,
    config: GetEntityNodeDef
  ): void {
    RED.nodes.createNode(this, config);
    this.on("input", (rawMsg, send, done) => {
      const payload = rawMsg.payload as unknown as Payload;

      const missingKeys = requiredKeys.filter((rk) => !Object.keys(payload).some((p) => p == rk))
      if(missingKeys.length > 0){
        this.error(`${missingKeys.reduce((a, b) => `${a},${b}`, 'Keys Missing: ')}`);
      }

      if (payload?.entity_type) {
        const url = `${payload.toConfig_baseUrl}/${payload.entity_type}`; // Adjust if your Grocy API endpoint differs
    
        axios.get(url, {
          headers: {
            'GROCY-API-KEY': payload.toConfig_apiKey,
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
    });
  }

  RED.nodes.registerType("get-entity", GetEntityNodeConstructor);
};

export = nodeInit;
