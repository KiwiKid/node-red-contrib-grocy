import { EditorNodeProperties } from "node-red";
import { GetEntityMethod, GetEntityOptions } from "../../shared/types";

export interface GetEntityEditorNodeProperties
  extends EditorNodeProperties,
    GetEntityOptions {
      method: GetEntityMethod
    }
