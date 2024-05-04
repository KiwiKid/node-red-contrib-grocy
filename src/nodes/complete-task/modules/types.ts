import { Node, NodeDef } from "node-red";
import { CompleteTaskOptions } from "../shared/types";
import { GrocyConfigNode } from "../../shared/types";

export interface CompleteTaskNodeDef extends NodeDef, CompleteTaskOptions {
    
}

export interface CompleteTaskNode extends Node {
    server: GrocyConfigNode
}
/*
export type GetEntityNode = Node;
*/
