"use strict";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageInfo = require('./../../../package.json');
const nodeInit = (RED) => {
    function GrocyConfigNodeConstructor(config) {
        RED.nodes.createNode(this, config);
        this.url = config.url;
        this.gkey = config.gkey;
        this.version = packageInfo.version;
    }
    RED.nodes.registerType("grocy-config", GrocyConfigNodeConstructor);
};
module.exports = nodeInit;
//# sourceMappingURL=grocy-config.js.map