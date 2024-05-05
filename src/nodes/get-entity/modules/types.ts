import { Node, NodeDef } from "node-red";
import { GetEntityOptions } from "../shared/types";
import { GrocyConfigNode } from "../../shared/types";

export enum SortOrder {
    ASC = "asc",
    DESC = "desc"
}

export interface GetEntityNodeDef extends NodeDef, GetEntityOptions {
    query: Array<string>
    order: SortOrder
    limit: number
    offset: number
}

export interface GetEntityNode extends Node {
    server: GrocyConfigNode
}
/*
export type GetEntityNode = Node;
*/
