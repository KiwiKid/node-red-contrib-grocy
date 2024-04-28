import { Node, NodeDef } from "node-red";
import { GetEntityOptions } from "../shared/types";

export interface GetEntityNodeDef extends NodeDef, GetEntityOptions {
    credentials: {
        username: string;
        password: string;
    };
}

// export interface GetEntityNode extends Node {}
export type GetEntityNode = Node;
