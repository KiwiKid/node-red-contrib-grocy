import { EditorRED } from "node-red";
import { GetEntityEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<GetEntityEditorNodeProperties>("get-entity", {
  category: "grocy",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "get entity",
  label: function () {
    return this.name || "get entity";
  },
});
