"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const nodeInit = (RED) => {
    function GetEntityNodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.server = RED.nodes.getNode(config.server);
        this.on('input', (msg, send, done) => {
            const url = `${this.server.url}/api/chores/${config.chore_id}/execute`;
            const data = Object.assign({
                "tracked_time": "2024-05-04T10:34:57.830Z",
                "done_by": 0,
                "skipped": false
            }, msg.payload);
            axios_1.default.post(url, data, {
                headers: {
                    'GROCY-API-KEY': this.server.gkey,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                msg.payload = response.data;
                send(msg);
                done();
            })
                .catch(error => {
                this.error(`Failed to POST chore_id:"${this.chore_id}" complete (${url} ${this.server.gkey.length > 0 ? 'KEY-SET' : 'no-key ⚠️'}): [error:${JSON.stringify(error)}] `);
                done();
            });
            done();
        });
        this.on("close", (done) => {
            console.log("Cleaning up resources...");
            if (done)
                done();
        });
    }
    RED.nodes.registerType("complete-chore", GetEntityNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=complete-chore.js.map