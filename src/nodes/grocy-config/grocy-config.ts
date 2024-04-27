import { NodeInitializer } from "node-red";
import { GrocyConfigNodeDef } from "./modules/types";
import { GrocyConfigNode } from "../shared/types";

const nodeInit: NodeInitializer = (RED): void => {
  function GrocyConfigNodeConstructor(
    this: GrocyConfigNode,
    config: GrocyConfigNodeDef
  ): void {
    RED.nodes.createNode(this, config);
  }

  RED.nodes.registerType("grocy-config", GrocyConfigNodeConstructor);
};

export = nodeInit;
