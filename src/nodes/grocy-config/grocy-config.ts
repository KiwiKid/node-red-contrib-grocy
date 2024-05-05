import { NodeInitializer } from "node-red";
import { GrocyConfigNodeDef } from "./modules/types";
import { GrocyConfigNode } from "../shared/types";
// eslint-disable-next-line @typescript-eslint/no-var-requires
//const packageInfo = require('./../../../package.json');

const nodeInit: NodeInitializer = (RED): void => {
  function GrocyConfigNodeConstructor(
    this: GrocyConfigNode,
    config: GrocyConfigNodeDef
  ): void {
    RED.nodes.createNode(this, config);
    this.url = config.url;
    this.gkey = config.gkey;
  //  this.version = packageInfo.version
  }

  RED.nodes.registerType("grocy-config", GrocyConfigNodeConstructor);
};

export = nodeInit;
