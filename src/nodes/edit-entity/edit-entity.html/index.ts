import { EditorRED } from "node-red";
import { EditEntityEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<EditEntityEditorNodeProperties>("edit-entity", {
  category: "function",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
    server: { value: "", type: "grocy-config"},
    entity_type: {value: ""}
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "edit entity",
  label: function () {
    return this.name || "edit entity";
  },
});
