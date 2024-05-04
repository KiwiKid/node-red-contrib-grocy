import { Node, NodeDef } from "node-red";
import { CompleteTaskOptions } from "../shared/types";
import { GrocyConfigNode } from "../../shared/types";

export interface GetEntityNodeDef extends NodeDef, CompleteTaskOptions {
    
}

export interface GetEntityNode extends Node {
    server: GrocyConfigNode
}
/*
export type GetEntityNode = Node;
*/
