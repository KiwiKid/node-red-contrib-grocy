import { Node, NodeDef } from "node-red";
import { AddEntityOptions } from "../shared/types";

export interface AddEntityNodeDef extends NodeDef, AddEntityOptions {}

// export interface AddEntityNode extends Node {}
export type AddEntityNode = Node;
