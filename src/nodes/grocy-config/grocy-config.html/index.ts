import { EditorRED } from "node-red";
import { GrocyConfigEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<GrocyConfigEditorNodeProperties>("grocy-config", {
  category: "grocy",
  defaults: {
    url: {
      value: "127.0.0.1:9283",
    },
    apiKey: {
      value: "",
    },
  },
  label: function () {
    return this.name || "grocy config 1";
  },
});
