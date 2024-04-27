import { Node, NodeDef } from "node-red";
import { GetEntityOptions } from "../shared/types";
//import { GrocyConfig } from "src/nodes/shared/types";

export interface GetEntityNodeDef extends NodeDef, GetEntityOptions {}
    /*config: GrocyConfig
}
*/
/*export interface GetEntityNode extends Node {
    config: GrocyConfig
 }*/
export type GetEntityNode = Node;
