import { createInventory, queryInventory } from "./src/inventory.js";

const main = (args) => {
  const inventory = createInventory();
  queryInventory(inventory ,args);
}

main(Deno.args);