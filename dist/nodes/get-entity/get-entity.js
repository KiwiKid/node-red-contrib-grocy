"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const nodeInit = (RED) => {
    function GetEntityNodeConstructor(config) {
        RED.nodes.createNode(this, config);
        const credentials = {
            url: RED.settings.get('GROCY_URL'),
            key: RED.settings.get('GROCY_KEY')
        };
        console.warn('SET URL :' + credentials.url);
        this.on('input', (msg, send, done) => {
            var _a, _b;
            const payload = msg.payload;
            const credentialsToUse = {
                url: (_a = payload.url) !== null && _a !== void 0 ? _a : credentials.url,
                key: (_b = payload.key) !== null && _b !== void 0 ? _b : credentials.key,
            };
            if (credentialsToUse.key == '') {
                this.error("Failed to get url, either set in node or pass via payload.key");
                done();
            }
            if (credentialsToUse.url == '') {
                this.error("Failed to get url, either set in node or pass via payload.url");
                done();
            }
            if (typeof (payload === null || payload === void 0 ? void 0 : payload.entity_type) == 'string') {
                const url = `${credentialsToUse.url}/api/objects/${payload.entity_type}`; // Adjust if your Grocy API endpoint differs
                switch (payload.method) {
                    case 'PUT':
                        axios_1.default.put(url, {
                            headers: {
                                'GROCY-API-KEY': credentialsToUse.key,
                                'Accept': 'application/json'
                            }
                        })
                            .then(response => {
                            msg.payload = response.data; // Attach API response to the output message
                            send(msg);
                            done();
                        })
                            .catch(error => {
                            this.error(`Failed to PUT "${payload.entity_type}" (${url}): ` + error.message);
                            done();
                        });
                        done();
                        break;
                    default:
                    case 'GET':
                        axios_1.default.get(url, {
                            headers: {
                                'GROCY-API-KEY': credentialsToUse.key,
                                'Accept': 'application/json'
                            }
                        })
                            .then(response => {
                            msg.payload = response.data; // Attach API response to the output message
                            send(msg);
                            done();
                        })
                            .catch(error => {
                            this.error(`Failed to GET "${payload.entity_type}" (${url}): ${error.message}` + error.message);
                            done();
                        });
                        break;
                }
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
    RED.nodes.registerType("get-entity", GetEntityNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=get-entity.js.map