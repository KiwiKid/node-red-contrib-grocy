import { EditorNodeProperties } from "node-red";
import { GetEntityOptions } from "../../shared/types";
import { GrocyConfigNode } from "src/nodes/grocy-config/modules/types";

export interface GetEntityEditorNodeProperties
  extends EditorNodeProperties,
    GetEntityOptions {
      server: GrocyConfigNode
    }
