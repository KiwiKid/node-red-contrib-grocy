import { Node, NodeDef } from "node-red";
import { GrocyConfigOptions } from "../shared/types";

export interface GrocyConfigNodeDef extends NodeDef, GrocyConfigOptions {}

// export interface GrocyConfigNode extends Node {}
export type GrocyConfigNode = Node;
