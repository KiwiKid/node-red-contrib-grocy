import { EditorRED } from "node-red";
import { CompleteTaskEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;


RED.nodes.registerType<CompleteTaskEditorNodeProperties>("complete-task", {
  category: "grocy",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
    server: { value:"", type: "grocy-config" },
    complete: { value: true },
    task_id: { value: "" }
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "complete task",
  label: function () {
    return `${this.complete ? 'compelete' : 'undo'} grocy task #${this.task_id}`;
  },
  oneditprepare: function () {
    $('#node-input-task-id').val(this.task_id);
    $('#node-input-complete').val(this.complete ? "true" : "false");

  },
  oneditsave: function () {
    // Access the flow context
   // const server = $('#node-input-server').val()?.toString() ?? '';
    const task_id = $('#node-input-task-id').val()?.toString() ?? '';
    const complete = $('#node-input-complete').val()?.toString() ?? '';

    // Set values globally using RED.settings
    //this.server = server
    this.task_id = +task_id;
    this.complete = complete == "true"
    // Notify user about the settings
 }
});
