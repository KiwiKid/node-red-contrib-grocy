import { Node, NodeDef } from "node-red";
import { GetEntityOptions } from "../shared/types";

export interface GetEntityNodeDef extends NodeDef, GetEntityOptions {}

export interface GetEntityNode extends Node {
    server: any
}
/*
export type GetEntityNode = Node;
*/
