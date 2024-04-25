import { Node, NodeDef } from "node-red";
import { GrocyConfigOptions } from "../shared/types";

export interface GrocyConfigNodeDef extends NodeDef, GrocyConfigOptions {}

// export interface GrocyConfigNode extends Node {}
export interface GrocyConfigNode extends Node {
  url: string;
  apiKey: string;
}
