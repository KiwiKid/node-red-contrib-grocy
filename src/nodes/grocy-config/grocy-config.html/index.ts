import { EditorRED } from "node-red";
import { GrocyConfigEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<GrocyConfigEditorNodeProperties>("grocy-config", {
  category: "grocy",
  defaults: {
    url: {
      value: "127.0.0.1:9283",
      required: true
    },
    apiKey: {
      value: "",
      required: true
    },
  },
  label: function () {
    return this.name || this.url;
  },
  oneditprepare: function () {
    $('#node-input-url').val(this.url);
    $('#node-input-api-key').val(this.apiKey);
  },
  oneditsave: function () {
    const url = $('#node-input-url').val()?.toString() ?? ''
    this.url = url;
    const key = $('#node-input-api-key').val()?.toString() ?? ''
    this.apiKey = key
  }
});
