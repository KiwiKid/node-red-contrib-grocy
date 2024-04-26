"use strict";
const nodeInit = (RED) => {
    function GetEntityNodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.on("input", (msg, send, done) => {
            send(msg);
            done();
        });
    }
    RED.nodes.registerType("get-entity-old", GetEntityNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=get-entity.js.map