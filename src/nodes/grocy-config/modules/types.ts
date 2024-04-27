import { Node, NodeDef } from "node-red";
import { GrocyConfig } from "../../shared/types";


export interface GrocyConfigNodeDef extends NodeDef, GrocyConfig {}
