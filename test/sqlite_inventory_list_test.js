import { queryInventory } from "../src/query_inventory.js";
import { createInventory, Inventory } from "../src/sqlite_inventory.js";
import { assertEquals } from "@std/assert";


Deno.test("displaying the record in table(items), no records are there in the items table", () => {
  const inventory = new Inventory(createInventory())
  queryInventory(inventory, ["init"]);
  const actual = queryInventory(inventory, ["list"]);
  const expected = [];
  assertEquals(actual, expected);
});

Deno.test("displaying the record in table(items), which contain one row", () => {
  const inventory = new Inventory(createInventory());
  queryInventory(inventory, ["init"]);
  const inventoryDB = inventory.retrieveDB();
  const insertStatement = inventoryDB.prepare(`
      INSERT into items (item_id, item_name, category, quantity, last_updated_time) values (?, ?, ?,?, ?);
    `);
  insertStatement.run(
    1,
    "Keyboard",
    "electronics",
    10,
    new Date().toISOString(),
  );
  const actual = queryInventory(inventory, ["list"])
  assertEquals(actual.length, 1);
});

Deno.test("displaying the record in table(items), which contain two rows", () => {
  const inventory = new Inventory(createInventory());
  queryInventory(inventory, ["init"]);
  const inventoryDB = inventory.retrieveDB();
  const insertStatement = inventoryDB.prepare(`
      INSERT into items (item_id, item_name, category, quantity, last_updated_time) values (?, ?, ?,?, ?);
    `);
  insertStatement.run(
    1,
    "Keyboard",
    "electronics",
    10,
    new Date().toISOString(),
  );
  insertStatement.run(
    2,
    "Mouse",
    "electronics",
    10,
    new Date().toISOString(),
  );
  const actual = queryInventory(inventory, ["list"])
  assertEquals(actual.length, 2);
});



