import { Node, NodeDef } from "node-red";
import { GetEntityOptions } from "../shared/types";

export interface GetEntityNodeDef extends NodeDef, GetEntityOptions {
    server: GrocyConfig
}

export interface GetEntityNode extends Node {
    server: GrocyConfig
 }
//export type GetEntityNode = Node;
