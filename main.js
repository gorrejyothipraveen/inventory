import { queryInventory } from "./src/inventory.js";

const main = (args) => {
  queryInventory(args);
}

main(Deno.args)