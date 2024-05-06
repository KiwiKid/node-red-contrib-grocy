import { NodeInitializer, NodeMessageInFlow } from "node-red";
import { EditEntityNode, EditEntityNodeDef } from "./modules/types";
import axios from 'axios';
import { GrocyConfigNode } from "../shared/types";

const nodeInit: NodeInitializer = (RED): void => {
  function EditEntityNodeConstructor(
    this: EditEntityNode,
    config: EditEntityNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    this.server = RED.nodes.getNode(config.server) as GrocyConfigNode;
    
    this.on('input', async (msg: NodeMessageInFlow, send, done) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { entityId, entity, entityData } = msg.payload;

      // Validate entity and entityId
      if (!entityId || !entity) {
        this.error("Missing required entity ID or entity type");
        done();
        return;
      }

      // Validate entityData
      if (!entityData || typeof entityData !== 'object' || Array.isArray(entityData)) {
        this.error("Invalid or missing entity data");
        done();
        return;
      }

      const url = `${this.server.url}/api/objects/${entity}/${entityId}`;

      axios.put(url, entityData, {
        headers: {
          'GROCY-API-KEY': this.server.gkey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => {
        msg.payload = response.data; // Attach API response to the output message
        send(msg);
        done();
      })
      .catch(error => {
        this.error(`Failed to PUT (${url}): \n\nerror:\n${error.message} \n\n[server:\n${JSON.stringify(this.server, null, 4)}\n]`);
        done();
      });
    });

    this.on("close", (done: () => void) => {
      console.log("Cleaning up resources...");
      if (done) done();
    });
  }

  RED.nodes.registerType("edit-entity", EditEntityNodeConstructor);
};

export = nodeInit;
