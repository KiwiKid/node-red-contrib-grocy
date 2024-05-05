import { EditorNodeProperties } from "node-red";
import { GrocyConfigOptions } from "../../../shared/types";

export interface GrocyConfigEditorNodeProperties
  extends EditorNodeProperties,
  GrocyConfigOptions {
    }
