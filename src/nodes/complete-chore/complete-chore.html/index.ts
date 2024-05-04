import { EditorRED } from "node-red";
import { CompleteChoreEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;


RED.nodes.registerType<CompleteChoreEditorNodeProperties>("complete-chore", {
  category: "grocy",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
    server: { value:"", type: "grocy-config" },
    chore_id: { value: "" }
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "complete chore",
  label: function () {
    return `complete chore (${this.chore_id})`;
  },
  /*oneditprepare: function () {
    $('#node-input-method').val(this.method);
  },
  oneditsave: function () {
    // Access the flow context
    const url = $('#node-input-url').val()?.toString() ?? '';
    const key = $('#node-input-key').val()?.toString() ?? '';

    // Set values globally using RED.settings
    RED.settings.set('GROCY_URL', url);
    RED.settings.set('GROCY_KEY', key);

    // Notify user about the settings
    RED.notify(`Set Grocy (${this.method}) URL: ${url.length}, Key: ${key.length}`);
 }*/
});
