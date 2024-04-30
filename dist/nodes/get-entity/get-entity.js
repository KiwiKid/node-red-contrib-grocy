"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const nodeInit = (RED) => {
    function GetEntityNodeConstructor(config) {
        RED.nodes.createNode(this, config);
        const credentials = this.credentials;
        this.on('input', (msg, send, done) => {
            const payload = msg.payload;
            if (typeof (payload === null || payload === void 0 ? void 0 : payload.entity_type) == 'string') {
                const url = `${credentials.username}/${payload.entity_type}`; // Adjust if your Grocy API endpoint differs
                axios_1.default.get(url, {
                    headers: {
                        'GROCY-API-KEY': credentials.password,
                        'Accept': 'application/json'
                    }
                })
                    .then(response => {
                    msg.payload = response.data; // Attach API response to the output message
                    send(msg);
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
        });
        this.on("close", (done) => {
            console.log("Cleaning up resources...");
            if (done)
                done(); // Call 'done' if there are async tasks.
        });
    }
    RED.nodes.registerType("get-entity", GetEntityNodeConstructor, {
        credentials: {
            username: { type: "text" },
            password: { type: "password" }
        }
    });
};
module.exports = nodeInit;
//# sourceMappingURL=get-entity.js.map