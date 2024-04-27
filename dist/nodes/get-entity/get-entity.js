"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const requiredKeys = ['entity_type'];
const nodeInit = (RED) => {
    function GetEntityNodeConstructor(nodeConfig) {
        RED.nodes.createNode(this, nodeConfig);
        this.on("input", (rawMsg, send, done) => {
            const payload = rawMsg.payload;
            const cNode = RED.nodes.getNode('grocy-config');
            if (cNode) {
                const missingKeys = requiredKeys.filter((rk) => !Object.keys(payload).some((p) => p == rk));
                if (missingKeys.length > 0) {
                    this.error(`${missingKeys.reduce((a, b) => `${a},${b}`, 'Keys Missing: ')}`);
                }
                if (payload === null || payload === void 0 ? void 0 : payload.entity_type) {
                    const url = `${cNode.url}/${payload.entity_type}`; // Adjust if your Grocy API endpoint differs
                    axios_1.default.get(url, {
                        headers: {
                            'GROCY-API-KEY': cNode.apiKey,
                            'Accept': 'application/json'
                        }
                    })
                        .then(response => {
                        rawMsg.payload = response.data; // Attach API response to the output message
                        send(rawMsg);
                        done();
                    })
                        .catch(error => {
                        this.error("Failed to retrieve data: " + error.message);
                        done();
                    });
                }
                else {
                    this.error("No entity_type provided in the payload");
                    done();
                }
            }
            else {
                this.error("no cNode");
                done();
            }
        });
    }
    RED.nodes.registerType("get-entity", GetEntityNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=get-entity.js.map