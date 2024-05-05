import { EditorRED, NodeInitializer, NodeMessageInFlow } from "node-red";
import { GetEntityNode, GetEntityNodeDef } from "./modules/types";
import axios from 'axios'
import { GetEntityOptions } from "./shared/types";
import { GrocyConfigNode } from "../shared/types";
import qs from 'qs'
import z from 'zod';  // Import Zod

declare const RED: EditorRED;

const nodeInit: NodeInitializer = (RED): void => {
  function GetEntityNodeConstructor(
    this: GetEntityNode,
    config: GetEntityNodeDef
  ): void {
    RED.nodes.createNode(this, config);

    this.server = RED.nodes.getNode(config.server) as GrocyConfigNode

    const payloadSchema = z.object({
      query: z.string().optional(),
      order: z.string().optional(),
      limit: z.number().optional(),
      offset: z.number().optional()
    });
    
    this.on('input', (msg, send, done) => {
      const url = `${this.server.url}/api/objects/${config.entity_type}`; 
      
      const validatedPayload = payloadSchema.parse(msg.payload);

      const fullUrl = `${url}?${qs.stringify(validatedPayload)}`

      axios.get(fullUrl, {
        headers: {
          'GROCY-API-KEY': this.server.gkey,
          'Accept': 'application/json'
        }
      })
      .then(response => {
        msg.payload = response.data; // Attach API response to the output message
        send(msg);
        done();
      })
      .catch(error => {
        if (error instanceof z.ZodError) {
          // Handle Zod errors (schema validation failures)
          this.error(`Payload error: ${error.issues.map(i => i.message).join(', ')}`);
        } else {
          // Handle other errors, e.g., from Axios
          this.error(`Failed to GET (${url}):  \n\nerror:\n${error.message} ${error.response?.data?.error_message} \n\n[server:\n${JSON.stringify(this.server, null, 4)}\n]`);
        }
      });

    });

    this.on("close", (done: () => void) => { // Ensure 'done' is used if it's provided.
      console.log("Cleaning up resources...");
      if (done) done(); // Call 'done' if there are async tasks.
    });
  }

  RED.nodes.registerType("get-entity", GetEntityNodeConstructor);
};

export = nodeInit;
