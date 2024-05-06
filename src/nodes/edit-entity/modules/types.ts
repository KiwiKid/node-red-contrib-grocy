import { Node, NodeDef } from "node-red";
import { EditEntityOptions } from "../shared/types";

export interface EditEntityNodeDef extends NodeDef, EditEntityOptions {}

 export interface EditEntityNode extends Node {
    server: any
 }
//export type EditEntityNode = Node;
