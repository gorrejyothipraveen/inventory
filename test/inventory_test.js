import { assertEquals, assertThrows } from "@std/assert";
import * as inventoryFns from "../src/memory_inventory.js";
import { queryInventory } from "../src/query_inventory.js";

Deno.test("simple test :", () => {
  let inventory;
  assertThrows(
    () => {
      queryInventory(inventory, inventoryFns, ["init"]);
    },
  );
});

Deno.test("creating the inventory", () => {
  const inventory = inventoryFns.createInventory();
  assertEquals(inventory, { tables: {} });
});

Deno.test("inventory does contain any table , which is empty now we are creating the table  ", () => {
  const inventory = inventoryFns.createInventory();
  inventoryFns.initInventory(inventory);
  const result = {
    tables: {
      items: [],
    },
  };
  assertEquals(inventory, result);
});

Deno.test(
  `including it in the queryInventory , 
  if choice is init then it will initializes the items table , it already exist it won't create`,
  () => {
    const inventory = inventoryFns.createInventory();
    queryInventory(inventory, inventoryFns, ["init"]);
    const result = {
      tables: {
        items: [],
      },
    };
    assertEquals(inventory, result);
  },
);

Deno.test("retrieving the existing row from the items table", () => {
  const inventory = inventoryFns.createInventory();
  queryInventory(inventory, inventoryFns, "init");
  const record = {
    id: 1,
    name: "Keyboard",
    category: "electronics",
    quantity: 10,
  };
  inventory.tables.items = record;
  const actual = inventoryFns.itemsList(inventory);
  assertEquals(actual, record);
});

Deno.test("retrieving rows , here two rows are added one is Keyboard and second one monitor", () => {
  const inventory = inventoryFns.createInventory();
  queryInventory(inventory, inventoryFns, ["init"]);
  const record1 = {
    id: 1,
    name: "Keyboard",
    category: "electronics",
    quantity: 10,
  };
  const record2 = {
    id: 1,
    name: "Mouse",
    category: "electronics",
    quantity: 20,
  };

  inventory.tables.items.push(record1);
  inventory.tables.items.push(record2);
  const actual = queryInventory(inventory, inventoryFns, ["list"]);
  assertEquals(actual, [record1, record2]);
});

Deno.test("inserting the item into items table", () => {
  const inventory = inventoryFns.createInventory();
  queryInventory(inventory, inventoryFns, ["init"]);
  inventoryFns.addItem(inventory, "Keyboard", "electronics", 20);
  const actual = queryInventory(inventory, inventoryFns, ["list"]);
  const expected = {
    id: 1,
    name: "Keyboard",
    category: "electronics",
    quantity: 20,
  };
  assertEquals(actual, [expected]);
});

Deno.test("inserting two items into items table", () => {
  const inventory = inventoryFns.createInventory();
  queryInventory(inventory, inventoryFns, ["init"]);
  inventoryFns.addItem(inventory, "Keyboard", "electronics", 20);
  inventoryFns.addItem(inventory, "Monitor", "electronics", 20);
  const actual = queryInventory(inventory, inventoryFns, ["list"]);
  const expected = [{
    id: 1,
    name: "Keyboard",
    category: "electronics",
    quantity: 20,
  }, {
    id: 2,
    name: "Monitor",
    category: "electronics",
    quantity: 20,
  }];
  assertEquals(actual, expected);
});


