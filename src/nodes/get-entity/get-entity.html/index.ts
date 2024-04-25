import { EditorRED, NodeInitializer, NodeDef } from "node-red";

import { EntityOption, GetEntityOptions } from "../shared/types";
import { GrocyConfigNode } from "src/nodes/grocy-config/modules/types";

declare const RED: EditorRED;

interface GetEntityNode extends NodeDef {
  configNode: GrocyConfigNode; // Reference to the config node
}


const nodeInit: NodeInitializer = (RED:EditorRED): void => {
  function GetEntityNodeConstructor(this: GetEntityNode, config: GetEntityOptions): void {
    RED.nodes.createNode(this, config);
    this.configNode = RED.nodes.getNode(config) as GrocyConfigNode;

    const validEntities = Object.values(EntityOption);

    this.on("input", async (msg, send, done) => {
      const entityType = msg.payload.type as keyof typeof EntityOption;

      // Validate entity type
      if (!validEntities.includes(entityType)) {
        this.error("Invalid entity type provided.");
        done();
        return;
      }

      // API URL setup
      const apiUrl = `${this.configNode.url}/objects/${entityType}`; 
      
      try {
        const response = await axios.get(apiUrl, {
            headers: { 'X-API-KEY': this.configNode.apiKey }
        });
        msg.payload = response.data;
        send(msg);
        done();
    } catch (error) {
        this.error("Failed to fetch entity data: " + error.message);
        done();
    }
    });
  }

  RED.nodes.registerType("get-entity", GetEntityNodeConstructor);
};

export = nodeInit;