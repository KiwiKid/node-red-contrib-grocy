import { EditorRED } from "node-red";
import { CompleteChoreEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;


RED.nodes.registerType<CompleteChoreEditorNodeProperties>("complete-chore", {
  category: "grocy",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
    server: { value:"", type: "grocy-config" },
    chore_id: { value: "" },
    complete: { value: "" },
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "complete chore",
  label: function () {
    return `complete chore #${this.chore_id}`;
  },
  oneditprepare: function () {
    $('#node-input-chore-id').val(this.chore_id);
   // $('#node-input-complete').val(this.complete ? "true" : "false");
  },
  oneditsave: function () {
    // Access the flow context
    const server = $('#node-input-server').val()?.toString() ?? '';
    const chore_id = $('#node-input-chore-id').val()?.toString() ?? '';
    const complete = $('#node-input-complete').val()?.toString() ?? '';

    // Set values globally using RED.settings
    this.server = server
    this.chore_id = +chore_id;
    this.complete = complete
    // Notify user about the settings
 }
});
