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
    }
    RED.nodes.registerType("grocy-config", GrocyApiConfigNode);
    
    interface TaskPayload {
        taskId: string;
    }
    function GrocyTasksNode(this: Node, config: any) {
        RED.nodes.createNode(this, config);
        const configNode: Node & { nodeUrl?: string, nodeApiKey?: string } = RED.nodes.getNode(config.apiConfig) as Node & { nodeUrl?: string, nodeApiKey?: string };

        this.on('input', async (msg: NodeMessageInFlow) => {
            const payload = msg.payload as TaskPayload;

            if (!configNode || !configNode.nodeUrl || !configNode.nodeApiKey) {
                this.error("API configuration not set.");
                this.status({fill:"red", shape:"ring", text:"API configuration not set."});
                return;
            }

            const taskData = {
                id: payload.taskId,
            };

            try {
                const response = await axios.post(configNode.nodeUrl, taskData, {
                    headers: { 'GROCY-API-KEY': configNode.nodeApiKey }
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
