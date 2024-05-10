import { EditorRED } from "node-red";
import { GetEntityEditorNodeProperties } from "./modules/types";
import { GetEntityMethod } from "../shared/types";
import { EntityType } from "../../shared/types";

declare const RED: EditorRED;


RED.nodes.registerType<GetEntityEditorNodeProperties>("get-entity", {
  category: "grocy",
  color: "#a6bbcf",
  defaults: {
    name: { value: "" },
    entity_type: { value: "" },
    entity_id: { value: ""},
    server: { value:"", type: "grocy-config" },
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "get xx entities",
  label: function () {
    return `get ${this.entity_type ? this.entity_type : 'xx'} entities`;
  },
  oneditprepare: function () {
    $('#node-input-server').val(this.server)
    $('#node-input-entity-type').val(this.entity_type);
    $('#node-input-entity-id').val(this.entity_id ? this.entity_id : '');
    console.log('Edit prepare:', this.entity_type);
  },
  oneditsave: function () {
    // Access the flow context
    const server = $('#node-input-server').val()?.toString() ?? '';
    const et = $('#node-input-entity-type').val()?.toString() ?? '';
    const etId = $('#node-input-entity-id').val()?.toString() ?? '';
    //const enumType = EntityType[et as keyof typeof EntityType];

    this.server = server;
    this.entity_type = et ;
    this.entity_id = etId

    // Notify user about the settings
    RED.notify(`Set Grocy (${this.entity_type}) [${et}] [[${$('#node-input-entity-type').val()}]] URL: ${server}`);
 }
});
