import { EditorNodeProperties } from "node-red";
import { EditEntityOptions } from "../../shared/types";

export interface EditEntityEditorNodeProperties
  extends EditorNodeProperties,
    EditEntityOptions {}
