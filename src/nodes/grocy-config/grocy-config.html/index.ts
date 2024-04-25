import { EditorRED } from "node-red";
import { GrocyConfigEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<GrocyConfigEditorNodeProperties>("grocy-config", {
  category: "config",
  defaults: {
    url: "127.0.0.1:9283",
    apiKey: "",

  },
  label: function () {
    return this.name || "grocy config";
  },
});
