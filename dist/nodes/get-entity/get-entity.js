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
            const credentialsToUse = {
                url: this.server.url,
                key: this.server.gkey,
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
                /*            axios.put(url, {
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
                              this.error(`Failed to PUT "${payload.entity_type}" (${url}): [server:${JSON.stringify(this.server)}] ` + error.message);
                              done();
                            });
                            done();
                            break;
                          default:
                          case 'GET': */
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
                    this.error(`Failed to GET "${payload.entity_type}" (${url}):  \n\n${error.message} \n\n${JSON.stringify(credentialsToUse, null, 4)}`);
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
    RED.nodes.registerType("get-entity", GetEntityNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=get-entity.js.map