import { EditorRED } from "node-red";
import { GetEntityEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;


RED.nodes.registerType<GetEntityEditorNodeProperties>("get-entity", {
  category: "function",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
    thing: { value: "" },
    entity_type: { value: "tasks"},
    method: { value: 'GET', validate: (val) => val == '' || ['GET', 'PUT'].includes(val) }
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
    // Access the flow context
    const url = $('#node-input-url').val()?.toString() ?? '';
    const key = $('#node-input-key').val()?.toString() ?? '';

    // Set values globally using RED.settings
    RED.settings.set('GROCY_URL', url);
    RED.settings.set('GROCY_KEY', key);

    // Notify user about the settings
    RED.notify(`Set Grocy URL: ${url.length}, Key: ${key.length}`);
 }
});
