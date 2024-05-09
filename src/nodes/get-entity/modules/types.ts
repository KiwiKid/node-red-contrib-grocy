import { Node, NodeDef } from "node-red";
import { GetEntityOptions } from "../shared/types";
import { EntityType, GrocyConfigNode } from "../../shared/types";

export interface GetEntityNodeDef extends NodeDef, GetEntityOptions {
    //entity_type: EntityType
}

export interface GetEntityNode extends Node {
    server: any
    entity_type: EntityType
}

//export interface GetEntityNoder extends {};

