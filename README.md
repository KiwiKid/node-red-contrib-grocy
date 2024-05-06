(Not working yet - Early days on this project, aiming at setting and listing Tasks first)

[![npm version](https://badge.fury.io/js/@kiwikid%2Fnode-red-contrib-grocy.svg)](https://badge.fury.io/js/@kiwikid%2Fnode-red-contrib-grocy)


## Install [🚧 beta-testing 🚧]
```
# navigate to node red instance and run:
yarn add @kiwikid/node-red-contrib-grocy
```
OR 
Search: 

```
@kiwikid/node-red-contrib-grocy
```
(under "Manage palette" > "Install")



There are currently 4 nodes supported:

```
get-entities - /objects/{entity_type}/{?entity_id} -  The generic get entity endpoint (entity_type is configurable via node, filters via payload, optional id)
complete-chore - /chore/{chore_id}/execute - For a given chore_id, complete the chore
complete-task - /tasks/{task_id}/complete - For a given task_id, complete the task
🚧 edit-entity - /objects/{entity_type}/{objectId} - For a given {objectId} (of type {entity_type}), update based on the payload
```


# Publish
```bash
yarn pre:publish
npm publish
```


