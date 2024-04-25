import { Node, NodeDef } from "node-red";
import { GetEntityOptions } from "../shared/types";
import { GrocyConfigOptions } from "../../grocy-config/shared/types";

export interface GetEntityNodeDef extends NodeDef, GetEntityOptions {}

export interface GetEntityNode extends Node {
  configNode: GrocyConfigOptions;
}
//export type GetEntityNode = Node;
