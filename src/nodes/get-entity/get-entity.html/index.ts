import { EditorRED, NodeInitializer } from "node-red";
import axios from "axios";

import { EntityOption } from "../shared/types";
import { GrocyConfigNode } from "../../grocy-config/modules/types";
import { GetEntityNode, GetEntityNodeDef } from "../modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  function GetEntityNodeConstructor(
    this: GetEntityNode,
    config: GetEntityNodeDef
  ): void {
    RED.nodes.createNode(this, config);
    this.configNode = (RED.nodes.getNode(
      "grocy-config"
    ) as any) as GrocyConfigNode;

    this.on("input", async (msg: any, send, done) => {
      console.log(msg.payload);
      if (!msg.payload || !msg.payload.type) {
        this.error("Invalid entity type provided.");
        done();
        return;
      }
      const entityType = msg.payload.type as keyof typeof EntityOption;

      if (
        !Object.values(EntityOption).includes(
          EntityOption[entityType as keyof typeof EntityOption]
        )
      ) {
        this.error("Invalid entity type provided.");
        done();
        return;
      }
      const apiUrl = `${this.configNode.url}/objects/${entityType}`;

      try {
        const response = await axios.get(apiUrl, {
          headers: { "X-API-KEY": this.configNode.apiKey },
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

export default nodeInit;
