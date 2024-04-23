import { NodeAPI, Node, NodeDef } from 'node-red';

interface GrocyApiConfigNodeDef extends NodeDef {
    url: string;
    apiKey: string;
}

module.exports = function(RED: NodeAPI) {
    function GrocyApiConfigNode(this: Node, config: GrocyApiConfigNodeDef) {
        RED.nodes.createNode(this, config);
        
        // Instead of assigning to `this`, use a more local approach:
        const nodeUrl = config.url;
        const nodeApiKey = config.apiKey;

        // Now you can use `nodeUrl` and `nodeApiKey` wherever needed in your node's functions.
    }
    RED.nodes.registerType("grocy-api-config", GrocyApiConfigNode);
};
