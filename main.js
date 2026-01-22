import { queryInventory } from "./src/query_inventory.js";
import { createInventory, Inventory } from "./src/sqlite_inventory.js";

const main = (args) => {
  const inventory = new Inventory(createInventory());
  queryInventory(inventory, ["init"]);
  queryInventory(inventory, args);
  const result = queryInventory(inventory, ["list"]);
  console.table(result);
};

main(Deno.args);
