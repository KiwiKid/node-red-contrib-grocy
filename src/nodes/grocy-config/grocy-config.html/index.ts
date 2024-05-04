import { EditorRED } from "node-red";
import { GrocyConfigEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<GrocyConfigEditorNodeProperties>("grocy-config", {
  category: "config",
  defaults: {
    url: {
      value: "127.0.0.1:9283",
      required: true
    },
    gkey: {
      value: "",
      required: true
    },
  },
  label: function () {
    return this.name || `${this.url} ${this.gkey.length > 0 ? '[key-set]' : 'nah-bro'}`;
  },
 /* oneditprepare: function () {
    $('#node-config-input-url').val(this.url);
    $('#node-config-input-gkey').val(this.gkey);
  },
 /* oneditsave: function () {
    const url = $('#node-config-input-url').val()?.toString() ?? ''
    this.url = url;
    const gkey = $('#node-config-input-gkey').val()?.toString() ?? ''
    this.gkey = gkey
    RED.notify(`oneditsave ${url} ${gkey}`)
  }*/
});
