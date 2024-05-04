import { Node, NodeDef } from "node-red";
import { CompleteChoreOptions } from "../shared/types";
import { GrocyConfigNode } from "../../shared/types";

export interface CompleteChoreNodeDef extends NodeDef, CompleteChoreOptions {
    
}

export interface CompleteChoreNode extends Node {
    server: GrocyConfigNode
}
/*
export type GetEntityNode = Node;
*/
