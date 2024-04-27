import { Node, NodeDef } from "node-red";
import { GetEntityOptions } from "../shared/types";
import { GrocyConfig } from "../../shared/types";

export interface GetEntityNodeDef extends NodeDef, GetEntityOptions {}

export interface GetEntityNode extends Node {
  configNode: GrocyConfig;
}
//export type GetEntityNode = Node;
