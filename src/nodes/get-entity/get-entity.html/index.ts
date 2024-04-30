import { EditorRED } from "node-red";
import { GetEntityEditorNodeProperties } from "./modules/types";

declare const RED: EditorRED;

interface GetEntityCredentials {
  username: { type: string };
  password: { type: string };
}


RED.nodes.registerType<GetEntityEditorNodeProperties, GetEntityCredentials>("get-entity", {
  category: "function",
  color: "#a6bbcf",
  defaults: {
    credentials: {
      value: ""
    },
    name: { value: "" },
  },
  credentials: {
    username: {type:"text"},
    password: {type:"password"}
  },
  inputs: 1,
  outputs: 1,
  icon: "file.png",
  paletteLabel: "get entity",
  label: function () {
    return this.name || "get entity";
  },
});
