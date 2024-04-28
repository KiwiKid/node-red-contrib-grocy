import { Node } from "node-red";
/*
export interface GrocyConfigNodeDef extends NodeDef {
    url: string;
    apiKey: string;
}

export type GrocyConfigNode = Node;


*/

export interface GrocyConfig {
    url: string;
    key: string;
}

export interface GrocyConfigNode extends Node { 
    url: string;
    key: string;
}
