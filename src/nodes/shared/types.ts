import { Node } from "node-red";

/*
export interface GrocyConfigNodeDef extends NodeDef {
    url: string;
    apiKey: string;
}

export type GrocyConfigNode = Node;


*/

export const getSpecificObject = async (serverUrl:string, gKey: string, entity_type: EntityType, id: number): Promise<unknown> => {
  const url = `${serverUrl}/api/objects/${entity_type}/${id}`;
    const headers = {
        'GROCY-API-KEY': gKey,
        'Accept': 'application/json'
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Failed to GET (${url}): \n\nerror:\n${error}`);
        throw error; // Rethrow to ensure error handling is consistent with previous behavior
    }
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