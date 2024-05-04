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
    entity_type: { value: EntityType.Tasks, validate: (val) => val == '' || Object.keys(EntityType).includes(val) },
    method: { value: GetEntityMethod.GET, validate: (val) => val == '' || Object.keys(GetEntityMethod).includes(val) },
    server: { value:"", type: "grocy-config" },
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "get entity",
  label: function () {
    return `${this?.method} entity`;
  },
  oneditprepare: function () {
    $('#node-input-method').val(this.method);
  },
  /*oneditsave: function () {
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
