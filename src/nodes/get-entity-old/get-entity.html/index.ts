import { EditorRED } from "node-red";
import { GetEntityEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

RED.nodes.registerType<GetEntityEditorNodeProperties>("get-entity", {
  category: "grocy",
  color: "#a6bbcf",
  defaults: {
    entity_type: { value: ""},
    name: { value: "" },
  },
  inputs: 1,
  outputs: 1,
  icon: "transform-text.png",
  paletteLabel: "get entity",
  label: function () {
    if (this.name) {
      return this.name;
    }
   // switch (this.operation) {
   //   case EntityOption.Tasks: {
        return this.entity_type?.toString();
   //   }
    //  case TransformTextOperation.LowerCase: {
  //      return "to lower case";
   //   }
  //  }
  },
});


