import { EditorNodeProperties } from "node-red";
import { AddEntityOptions } from "../../shared/types";

export interface AddEntityEditorNodeProperties
  extends EditorNodeProperties,
    AddEntityOptions {}
