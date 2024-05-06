"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const nodeInit = (RED) => {
    function GetEntityNodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.server = RED.nodes.getNode(config.server);
        this.on('input', (msg, send, done) => {
            if (msg.payload) {
                Object.keys(msg === null || msg === void 0 ? void 0 : msg.payload).forEach((k) => {
                    if (![
                        'query',
                        'order',
                        'limit',
                        'offset',
                    ].includes((k))) {
                        this.error(`${k} in payload is not supported`);
                        done();
                        return;
                    }
                });
            }
            const url = `${this.server.url}/api/objects/${config.entity_type}?${qs_1.default.stringify(msg.payload)}`;
            axios_1.default.get(url, {
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
                this.error(`Failed to GET (${url}):  \n\nerror:\n${error.message} \n\n[server:\n${JSON.stringify(this.server, null, 4)}\n]`);
                done();
            });
        });
        this.on("close", (done) => {
            console.log("Cleaning up resources...");
            if (done)
                done(); // Call 'done' if there are async tasks.
        });
    }
    RED.nodes.registerType("get-entity", GetEntityNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=get-entity.js.map