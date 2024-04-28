"use strict";
const nodeInit = (RED) => {
    function GrocyConfigNodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.url = config.url;
        this.key = config.key;
    }
    RED.nodes.registerType("grocy-config", GrocyConfigNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=grocy-config.js.map