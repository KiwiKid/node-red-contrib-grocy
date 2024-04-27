"use strict";
const nodeInit = (RED) => {
    function GrocyConfigNodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.url = config.url;
        this.apiKey = config.apiKey;
    }
    RED.nodes.registerType("grocy-config", GrocyConfigNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=grocy-config.js.map