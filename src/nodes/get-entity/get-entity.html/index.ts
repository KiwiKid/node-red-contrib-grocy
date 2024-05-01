import { EditorRED } from "node-red";
import { GetEntityEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;


RED.nodes.registerType<GetEntityEditorNodeProperties>("get-entity", {
  category: "function",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
    thing: { value: "" },
    entity_type: { value: "tasks"}
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "get entity",
  label: function () {
    return this.name || "get entity";
  },
  /*oneditprepare: function () {
    $('#node-config-input-url').val(os.);
    $('#node-config-input-key').val(this.key);
  },*/
  oneditsave: function () {
    const url = $('#node-input-url').val()?.toString() ?? ''
    RED.settings.set('GROCY_URL', url)
    const key = $('#node-input-key').val()?.toString() ?? ''
    RED.settings.set('GROCY_KEY', key)
    RED.notify(`set grocy url:${(url?.length)} key:${key?.length}`)
  }
});
