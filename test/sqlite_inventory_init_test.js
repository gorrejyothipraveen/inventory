import { assertEquals, assertThrows } from "@std/assert";
import { queryInventory } from "../src/query_inventory.js";
import { createInventory, Inventory } from "../src/sqlite_inventory.js";

Deno.test("query inventory has nothing , just created the function", () => {
  assertThrows(() => queryInventory());
});

Deno.test("creating an inventory in sqlite :", () => {
  const inventory = new Inventory(createInventory())
  const inventoryDB = inventory.retrieveDB();
  queryInventory(inventory, ["init"]);
  const result = inventoryDB.prepare(`
      SELECT name FROM sqlite_schema where type = 'table';
    `).all();

  const tableNames = result.filter((x) => {
    if (x.name !== "sqlite_sequence") return x.name;
  });
  assertEquals(tableNames[0].name, "items");
});




