"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const nodeInit = (RED) => {
    function EditEntityNodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.server = RED.nodes.getNode(config.server);
        this.on('input', async (msg, send, done) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { entityId, entity, entityData } = msg.payload;
            // Validate entity and entityId
            if (!entityId || !entity) {
                this.error("Missing required entity ID or entity type");
                done();
                return;
            }
            // Validate entityData
            if (!entityData || typeof entityData !== 'object' || Array.isArray(entityData)) {
                this.error("Invalid or missing entity data");
                done();
                return;
            }
            const url = `${this.server.url}/api/objects/${entity}/${entityId}`;
            axios_1.default.put(url, entityData, {
                headers: {
                    'GROCY-API-KEY': this.server.gkey,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                msg.payload = response.data; // Attach API response to the output message
                send(msg);
                done();
            })
                .catch(error => {
                this.error(`Failed to PUT (${url}): \n\nerror:\n${error.message} \n\n[server:\n${JSON.stringify(this.server, null, 4)}\n]`);
                done();
            });
        });
        this.on("close", (done) => {
            console.log("Cleaning up resources...");
            if (done)
                done();
        });
    }
    RED.nodes.registerType("edit-entity", EditEntityNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=edit-entity.js.map