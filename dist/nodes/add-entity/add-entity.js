"use strict";
const nodeInit = (RED) => {
    function AddEntityNodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.on("input", (msg, send, done) => {
            send(msg);
            done();
        });
    }
    RED.nodes.registerType("add-entity", AddEntityNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=add-entity.js.map