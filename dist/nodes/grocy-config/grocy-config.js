"use strict";
const nodeInit = (RED) => {
    function GrocyConfigNodeConstructor(config) {
        RED.nodes.createNode(this, config);
    }
    RED.nodes.registerType("grocy-config", GrocyConfigNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=grocy-config.js.map