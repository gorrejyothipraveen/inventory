import { createInventory, queryInventory } from "./src/inventory.js";

const main = (args) => {
  const inventory = createInventory();
  queryInventory(inventory,["init"])
  inventory.tables.items.push({
    id : 1,
    name : 'Keyboard',
    category : 'electronics',
    quantity : 10
  })
  const result = queryInventory(inventory ,args);
  console.log(result)
}

main(Deno.args);