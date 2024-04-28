import { EditorNodeProperties } from "node-red";
import { GetEntityOptions } from "../../shared/types";
import { GrocyConfig } from "../../../shared/types";

export interface GetEntityEditorNodeProperties
  extends EditorNodeProperties,
    GetEntityOptions {
      credentials: GrocyConfig
    }
