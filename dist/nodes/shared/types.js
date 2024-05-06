"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityType = exports.getSpecificObject = void 0;
const axios_1 = __importDefault(require("axios"));
/*
export interface GrocyConfigNodeDef extends NodeDef {
    url: string;
    apiKey: string;
}

export type GrocyConfigNode = Node;


*/
const getSpecificObject = async (serverUrl, gKey, entity_type, id) => {
    const url = `${serverUrl}/api/objects/${entity_type}/${id}`;
    return axios_1.default.get(url, {
        headers: {
            'GROCY-API-KEY': gKey,
            'Accept': 'application/json'
        }
    })
        .then(response => {
        return response.data; // Attach API response to the output message
    })
        .catch(error => {
        console.error(`Failed to GET (${url}):  \n\nerror:\n${JSON.stringify(error, null, 4)}`);
    });
};
exports.getSpecificObject = getSpecificObject;
var EntityType;
(function (EntityType) {
    EntityType["Batteries"] = "batteries";
    EntityType["BatteryChargeCycles"] = "battery_charge_cycles";
    EntityType["Chores"] = "chores";
    EntityType["ChoresLog"] = "chores_log";
    EntityType["Equipment"] = "equipment";
    EntityType["Locations"] = "locations";
    EntityType["MealPlan"] = "meal_plan";
    EntityType["MealPlanSections"] = "meal_plan_sections";
    EntityType["ProductBarcodes"] = "product_barcodes";
    EntityType["ProductGroups"] = "product_groups";
    EntityType["Products"] = "products";
    EntityType["ProductsAveragePrice"] = "products_average_price";
    EntityType["ProductsLastPurchased"] = "products_last_purchased";
    EntityType["QuantityUnitConversions"] = "quantity_unit_conversions";
    EntityType["QuantityUnitConversionsResolved"] = "quantity_unit_conversions_resolved";
    EntityType["QuantityUnits"] = "quantity_units";
    EntityType["Recipes"] = "recipes";
    EntityType["RecipesNestings"] = "recipes_nestings";
    EntityType["RecipesPos"] = "recipes_pos";
    EntityType["RecipesPosResolved"] = "recipes_pos_resolved";
    EntityType["ShoppingList"] = "shopping_list";
    EntityType["ShoppingLists"] = "shopping_lists";
    EntityType["ShoppingLocations"] = "shopping_locations";
    EntityType["Stock"] = "stock";
    EntityType["StockCurrentLocations"] = "stock_current_locations";
    EntityType["StockLog"] = "stock_log";
    EntityType["TaskCategories"] = "task_categories";
    EntityType["Tasks"] = "tasks";
    EntityType["Userentities"] = "userentities";
    EntityType["Userfields"] = "userfields";
    EntityType["Userobject"] = "userobject";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
//# sourceMappingURL=types.js.map