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
            if (!this.task_id || this.task_id == 0) {
                this.error('Failed due to missing task_id');
                done();
                return;
            }
            const payload = msg.payload;
            const url = `${this.server.url}/api/tasks/${this.task_id}/${config.complete ? 'complete' : 'undo'}`; // Adjust if your Grocy API endpoint differs
            axios_1.default.post(url, payload, {
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
                this.error(`Failed to post task_id:(${url}) \n\n(payload:${JSON.stringify(payload, null, 4)}) \n\nconfig:${JSON.stringify(config, null, 4)}: \n\n[error:${JSON.stringify(error, null, 4)}]`);
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
    RED.nodes.registerType("complete-task", GetEntityNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=complete-task.js.map