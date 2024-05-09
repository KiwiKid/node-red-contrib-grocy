import { EditorRED } from "node-red";
import { AddEntityEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<AddEntityEditorNodeProperties>("add-entity", {
  category: "function",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "add entity",
  label: function () {
    return this.name || "add entity";
  },
});
