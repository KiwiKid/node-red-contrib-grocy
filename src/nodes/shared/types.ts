import { Node } from "node-red";
import * as http from 'http';
import * as https from 'https';

/*
export interface GrocyConfigNodeDef extends NodeDef {
    url: string;
    apiKey: string;
}

export type GrocyConfigNode = Node;


*/

export const getSpecificObject = async (serverUrl:string, gKey: string, entity_type: EntityType, id: number): Promise<unknown> => {
  const url = new URL(`${serverUrl}/api/objects/${entity_type}/${id}`);
    const protocol = url.protocol === 'https:' ? https : http;

    
  return new Promise((resolve, reject) => {
      const options = {
          headers: {
              'GROCY-API-KEY': gKey,
              'Accept': 'application/json'
          }
      };

      const req = protocol.get(url, options, (res) => {
          let data = '';
          res.on('data', (chunk) => {
              data += chunk;
          });
          res.on('end', () => {
              resolve(JSON.parse(data));
          });
      });

      req.on('error', (error) => {
          console.error(`Failed to GET (${url.href}):  \n\nerror:\n${JSON.stringify(error, null, 4)}`);
          reject(error);
      });

      req.end();
  });
}

export interface GrocyConfig {
    url: string;
    gkey: string;
}

export interface GrocyConfigNode extends Node { 
    url: string;
    gkey: string;
}


export enum EntityType {
Batteries = 'batteries',
 BatteryChargeCycles = 'battery_charge_cycles' ,
 Chores = 'chores' ,
 ChoresLog = 'chores_log' ,
 Equipment = 'equipment' ,
 Locations = 'locations' ,
 MealPlan = 'meal_plan' ,
 MealPlanSections = 'meal_plan_sections' ,
 ProductBarcodes = 'product_barcodes' ,
 ProductGroups = 'product_groups' ,
 Products = 'products' ,
 ProductsAveragePrice = 'products_average_price' ,
 ProductsLastPurchased = 'products_last_purchased' ,
 QuantityUnitConversions = 'quantity_unit_conversions' ,
 QuantityUnitConversionsResolved = 'quantity_unit_conversions_resolved' ,
 QuantityUnits = 'quantity_units' ,
 Recipes = 'recipes' ,
 RecipesNestings = 'recipes_nestings' ,
 RecipesPos = 'recipes_pos' ,
 RecipesPosResolved = 'recipes_pos_resolved' ,
 ShoppingList = 'shopping_list' ,
 ShoppingLists = 'shopping_lists' ,
 ShoppingLocations = 'shopping_locations' ,
 Stock = 'stock',
 StockCurrentLocations = 'stock_current_locations' ,
 StockLog = 'stock_log' ,
 TaskCategories = 'task_categories' ,
 Tasks = 'tasks' ,
 Userentities = 'userentities' ,
 Userfields = 'userfields' ,
 Userobject = 'userobject'
}