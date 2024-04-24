"use strict";
const types_1 = require("./shared/types");
const nodeInit = (RED) => {
    function TransformTextNodeConstructor(config) {
        RED.nodes.createNode(this, config);
        switch (config.operation) {
            case types_1.TransformTextOperation.UpperCase: {
                this.on("input", (msg, send, done) => {
                    if (typeof msg.payload === "string") {
                        msg.payload = msg.payload.toUpperCase();
                    }
                    send(msg);
                    done();
                });
                break;
            }
            case types_1.TransformTextOperation.LowerCase: {
                this.on("input", (msg, send, done) => {
                    if (typeof msg.payload === "string") {
                        msg.payload = msg.payload.toLowerCase();
                    }
                    send(msg);
                    done();
                });
                break;
            }
        }
    }
    RED.nodes.registerType("transform-text", TransformTextNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=transform-text.js.map