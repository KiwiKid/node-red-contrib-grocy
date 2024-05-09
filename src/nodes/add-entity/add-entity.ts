import { NodeInitializer } from "node-red";
import { AddEntityNode, AddEntityNodeDef } from "./modules/types";

const nodeInit: NodeInitializer = (RED): void => {
  function AddEntityNodeConstructor(
    this: AddEntityNode,
    config: AddEntityNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    this.on("input", (msg, send, done) => {
      send(msg);
      done();
      
    });
  }

  RED.nodes.registerType("add-entity", AddEntityNodeConstructor);
};

export = nodeInit;
