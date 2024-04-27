import { EditorNodeProperties } from "node-red";
import { GrocyConfig } from "../../../shared/types";

export interface GrocyConfigEditorNodeProperties
  extends EditorNodeProperties,
  GrocyConfig {}
