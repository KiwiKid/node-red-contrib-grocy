import { NodeAPI, Node, NodeMessageInFlow, NodeDef } from 'node-red';
import axios from 'axios';

interface GrocyApiConfigNodeDef extends NodeDef {
    url: string;
    apiKey: string;
}

module.exports = function(RED: NodeAPI) {
    function GrocyApiConfigNode(this: Node, config: GrocyApiConfigNodeDef) {
        RED.nodes.createNode(this, config);
        
        // @ts-ignore
        this.nodeUrl = config.url;
        // @ts-ignore
        this.nodeApiKey = config.apiKey;

        // Now you can use `nodeUrl` and `nodeApiKey` wherever needed in your node's functions.
    }
    RED.nodes.registerType("grocy-config", GrocyApiConfigNode);
};


interface TaskPayload {
    taskId: string;
}

interface GrocyTasksConfig extends NodeDef {
    apiConfig: string; // This should reference the ID of the config node
}

module.exports = function(RED: NodeAPI) {
    function GrocyTasksNode(this: Node, config: GrocyTasksConfig) {
        RED.nodes.createNode(this, config);
        const configNode: Node & { url?: string, key?: string } = RED.nodes.getNode(config.apiConfig) as Node & { url?: string, key?: string };

        this.on('input', async (msg: NodeMessageInFlow) => {
            // Using type assertion to ensure msg.payload is of type TaskPayload
            const payload = msg.payload as TaskPayload;

            if (!configNode || !configNode.url || !configNode.key) {
                this.error("API configuration not set.");
                this.status({fill:"red", shape:"ring", text:"API configuration not set."});
                return;
            }

            const taskData = {
                id: payload.taskId,
            };

            try {
                const response = await axios.post(configNode.url, taskData, {
                    headers: { 'GROCY-API-KEY': configNode.key }
                });
                
                this.send({payload: response.data});
                this.status({fill:"green", shape:"dot", text:"success"});
            } catch (error: any) {
                this.status({fill:"red", shape:"ring", text:"error"});
                this.error('Error creating task: ' + error.message, msg);
            }
        });
    }
    RED.nodes.registerType("grocy-tasks", GrocyTasksNode);
};
