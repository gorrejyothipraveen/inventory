import { queryInventory } from "./src/query_inventory.js";
import * as inventoryFns from "./src/sqlite_inventory.js";

const main = (args) => {
  const inventory = inventoryFns.createInventory();
  queryInventory(inventory, ["init"]);
  queryInventory(inventory, inventoryFns ,args);
  const result = queryInventory(inventory, ["list"]);
  console.table(result);
};

main(Deno.args);
