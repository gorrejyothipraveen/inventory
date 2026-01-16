import { createInventory, queryInventory } from "./src/memory_inventory.js";

const main = (args) => {
  const inventory = createInventory();
  queryInventory(inventory,["init"])
  queryInventory(inventory ,args);
  const result = queryInventory(inventory, ["list"])
  console.log(result)
}

main(Deno.args);