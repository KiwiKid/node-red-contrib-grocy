'use strict';

var axios = require('axios');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

module.exports = function (RED) {
    function GrocyApiConfigNode(config) {
        RED.nodes.createNode(this, config);
        // @ts-ignore
        this.nodeUrl = config.url;
        // @ts-ignore
        this.nodeApiKey = config.apiKey;
        // Now you can use `nodeUrl` and `nodeApiKey` wherever needed in your node's functions.
    }
    RED.nodes.registerType("grocy-config", GrocyApiConfigNode);
};
module.exports = function (RED) {
    function GrocyTasksNode(config) {
        RED.nodes.createNode(this, config);
        const configNode = RED.nodes.getNode(config.apiConfig);
        this.on('input', (msg) => __awaiter(this, void 0, void 0, function* () {
            // Using type assertion to ensure msg.payload is of type TaskPayload
            const payload = msg.payload;
            if (!configNode || !configNode.url || !configNode.key) {
                this.error("API configuration not set.");
                this.status({ fill: "red", shape: "ring", text: "API configuration not set." });
                return;
            }
            const taskData = {
                id: payload.taskId,
            };
            try {
                const response = yield axios.post(configNode.url, taskData, {
                    headers: { 'GROCY-API-KEY': configNode.key }
                });
                this.send({ payload: response.data });
                this.status({ fill: "green", shape: "dot", text: "success" });
            }
            catch (error) {
                this.status({ fill: "red", shape: "ring", text: "error" });
                this.error('Error creating task: ' + error.message, msg);
            }
        }));
    }
    RED.nodes.registerType("grocy-tasks", GrocyTasksNode);
};
