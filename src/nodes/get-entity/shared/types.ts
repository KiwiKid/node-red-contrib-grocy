export enum EntityOption {
  Batteries = "batteries",
  batteryChargeCycles = "battery_charge_cycles",
  Chores = "chores",
  Choreslog = "chores_log",
  Equipment = "equipment",
  Locations = "locations",
  MealPlan = "meal_plan",
  MealPlanSections = "meal_plan_sections",
  ProductBarcodes = "product_barcodes",
  ProductGroups = "product_groups",
  Products = "products",
  ProductsAveragePrice = "products_average_price",
  ProductsLastPurchased = "products_last_purchased",
  QuantityUnitConversions = "quantity_unit_conversions",
  QuantityUnitConversionsResolved = "quantity_unit_conversions_resolved",
  QuantityUnits = "quantity_units",
  Recipes = "recipes",
  RecipesNestings = "recipes_nestings",
  RecipesPos = "recipes_pos",
  RecipesPosResolved = "recipes_pos_resolved",
  ShoppingList = "shopping_list",
  ShoppingLists = "shopping_lists",
  ShoppingLocations = "shopping_locations",
  Stock = "stock",
  StockCurrentLocations = "stock_current_locations",
  StockLog = "stock_log",
  TaskCategories = "task_categories",
  Tasks = "tasks",
  UserEntities = "userentities",
  UserFields = "userfields",
  UserObjects = "userobjects",
}

export interface GetEntityOptions {
  url: string;
  apiKey: string;
}
