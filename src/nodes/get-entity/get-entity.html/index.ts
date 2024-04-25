import { NodeInitializer } from "node-red";
import axios from "axios";

import { EntityOption } from "../shared/types";
import { GrocyConfigNode } from "../../grocy-config/modules/types";
import { GetEntityNode, GetEntityNodeDef } from "../modules/types";

type Payload = {
  payload: {
    type: string,
  }
}

const nodeInit: NodeInitializer = (RED): void => {
  function GetEntityNodeConstructor(
    this: GetEntityNode,
    config: GetEntityNodeDef
  ): void {
    RED.nodes.createNode(this, config);
    this.configNode = (RED.nodes.getNode(
      "grocy-config"
    ) as unknown) as GrocyConfigNode;

    this.on("input", async (msg: unknown , send, done) => {
      const validMsg = msg as unknown as Payload

      console.log(validMsg?.payload);
      if (!validMsg.payload || !validMsg.payload.type) {
        this.error("Invalid entity type provided.");
        done();
        return;
      }

      const entityType = validMsg.payload.type as keyof typeof EntityOption;

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
        validMsg.payload = response.data;
        send(validMsg);
        done();
      } catch (error) {
        this.error("Failed to fetch entity data: " + JSON.stringify(error));
        done();
      }
    });
  }

  RED.nodes.registerType("get-entity", GetEntityNodeConstructor);
};

export default nodeInit;
