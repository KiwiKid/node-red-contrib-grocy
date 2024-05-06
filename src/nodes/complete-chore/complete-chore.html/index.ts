import { EditorRED } from "node-red";
import { CompleteChoreEditorNodeProperties } from "./modules/types";
import { EntityType, getSpecificObject } from "../../../nodes/shared/types";

declare const RED: EditorRED;


RED.nodes.registerType<CompleteChoreEditorNodeProperties>("complete-chore", {
  category: "grocy",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
    server: { value:"", type: "grocy-config" },
    chore_id: { value: "" },
    complete: { value: true },
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "complete chore",
  label: function () {
    return `complete chore #${this.chore_id}`;
  },
  oneditprepare: function () {
    if(this.chore_id > 0) {
      getSpecificObject(this.server?.url, this.server?.gkey, EntityType.Chores, this.chore_id)
      .then(obj => {
        // Display the result in a <pre> block
        const pre = $('<pre>').text(JSON.stringify(obj, null, 2));
        $('#node-input-chore-id').after(pre);
      })
      .catch(error => {
        console.error('Error fetching chore data:', error);
      });
    }
    $('#node-input-chore-id').val(this.chore_id);
    $('#node-input-complete').val(this.complete ? "true" : "false");
  },
  oneditsave: function () {
    // Access the flow context
   // const server = $('#node-input-server').val()?.toString() ?? '';
    const chore_id = $('#node-input-chore-id').val()?.toString() ?? '';
    const complete = $('#node-input-complete').val()?.toString() ?? '';

    // Set values globally using RED.settings
    //this.server = server
    this.chore_id = +chore_id;
    this.complete = complete == "true"
    // Notify user about the settings
 }
});
