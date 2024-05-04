"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const nodeInit = (RED) => {
    function GetEntityNodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.server = RED.nodes.getNode(config.server);
        /* const credentials = {
           url:  RED.settings.get('GROCY_URL'),
           key:  RED.settings.get('GROCY_KEY')
         }*/
        //console.warn('SET URL :'+ credentials.url)
        this.on('input', (msg, send, done) => {
            const payload = msg.payload;
            const url = `${this.server.url}/api/tasks/${payload.task_id}/${payload.complete ? 'complete' : 'undo'}`; // Adjust if your Grocy API endpoint differs
            axios_1.default.post(url, {
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
                this.error(`Failed to PUT task_id:"${payload.task_id}" complete:${payload.complete} (${url}): [server:${JSON.stringify(this.server)}] ` + error.message);
                done();
            });
            done();
        });
        this.on("close", (done) => {
            console.log("Cleaning up resources...");
            if (done)
                done(); // Call 'done' if there are async tasks.
        });
    }
    RED.nodes.registerType("complete-task", GetEntityNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=complete-task.js.map