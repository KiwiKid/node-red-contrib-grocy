"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityType = exports.getSpecificObject = void 0;
const http = __importStar(require("http"));
const https = __importStar(require("https"));
/*
export interface GrocyConfigNodeDef extends NodeDef {
    url: string;
    apiKey: string;
}

export type GrocyConfigNode = Node;


*/
const getSpecificObject = async (serverUrl, gKey, entity_type, id) => {
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