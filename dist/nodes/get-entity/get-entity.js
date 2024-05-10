"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const nodeInit = (RED) => {
    function GetEntityNodeConstructor(config) {
        RED.nodes.createNode(this, config);
        RED.log.info(`Set Grocy (config:${JSON.stringify(config)})`);
        this.server = RED.nodes.getNode(config.server);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        this.entity_type = config.entity_type;
        this.entity_id = config.entity_id;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const node = this;
        node.on('input', (msg, send, done) => {
            if (msg.payload) {
                Object.keys(msg === null || msg === void 0 ? void 0 : msg.payload).forEach((k) => {
                    if (![
                        'query',
                        'order',
                        'limit',
                        'offset',
                    ].includes((k))) {
                        node.log(`${k} in payload is not supported`);
                        this.error(`${k} in payload is not supported`);
                        if (done) {
                            done();
                        }
                        return;
                    }
                });
            }
            const url = `${node.server.url}/api/objects/${node.entity_type}${node.entity_id ? `/${node.entity_id}` : ''}?${qs_1.default.stringify(msg.payload)}`;
            axios_1.default.get(url, {
                headers: {
                    'GROCY-API-KEY': node.server.gkey,
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                msg.payload = response.data,
                    send(msg);
                if (done) {
                    done();
                }
            })
                .catch(error => {
                this.error(`Failed to post task_id:(${url}) \n\n===payload===\n:${JSON.stringify(msg.payload, null, 4)}) \n\n====config====\n:${JSON.stringify(config, null, 4)}: \n\n===error===:\n${JSON.stringify(error, null, 4)}] \n\n====this:==== \n${JSON.stringify(this)}`);
                if (done) {
                    done();
                }
            });
        });
        this.on("close", (done) => {
            if (done)
                done(); // Call 'done' if there are async tasks.
        });
    }
    RED.nodes.registerType("get-entity", GetEntityNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=get-entity.js.map