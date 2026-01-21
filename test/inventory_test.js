import { assertEquals, assertThrows } from "@std/assert";
import { createInventory, Inventory } from "../src/memory_inventory.js";
import { queryInventory } from "../src/query_inventory.js";

Deno.test("simple test :", () => {
  let inventory;
  assertThrows(
    () => {
      queryInventory(inventory, ["init"]);
    },
  );
});

Deno.test("creating the inventory", () => {
  const inventory = createInventory();
  assertEquals(inventory, { tables: {} });
});

Deno.test("inventory does contain any table , which is empty now we are creating the table  ", () => {
  const inventory = new Inventory(createInventory());
  const expected = queryInventory(inventory, ["list"]);
  assertEquals(inventory.itemsList(), expected);
});

Deno.test(
  `including it in the queryInventory , 
  if choice is init then it will initializes the items table , it already exist it won't create`,
  () => {
    const inventory = new Inventory(createInventory());
    queryInventory(inventory, ["init"]);
    const actual = inventory.itemsList();
    const expected = [];
    assertEquals(actual, expected);
  },
);

Deno.test("retrieving the existing row from the items table", () => {
  const inventory = new Inventory(createInventory());
  queryInventory(inventory, ["init"]);
  queryInventory(inventory, ["add", "Keyboard", "electronics", 10]);
  const expected = [{
    id: 1,
    name: "Keyboard",
    category: "electronics",
    quantity: 10,
  }];
  const actual = inventory.itemsList();
  assertEquals(actual, expected);
});

Deno.test("retrieving rows , here two rows are added one is Keyboard and second one monitor", () => {
  const inventory = new Inventory(createInventory());
  queryInventory(inventory, ["init"]);
  const expected = [{
    id: 1,
    name: "Keyboard",
    category: "electronics",
    quantity: 10,
  }, {
    id: 2,
    name: "Mouse",
    category: "electronics",
    quantity: 20,
  }];

  inventory.addItem("Keyboard", "electronics", 10);
  inventory.addItem("Mouse", "electronics", 20);
  const actual = queryInventory(inventory, ["list"]);
  assertEquals(actual, expected);
});

Deno.test("inserting the item into items table", () => {
  const inventory = new Inventory(createInventory());
  queryInventory(inventory, ["init"]);
  inventory.addItem("Keyboard", "electronics", 20);
  const actual = queryInventory(inventory, ["list"]);
  const expected = [{
    id: 1,
    name: "Keyboard",
    category: "electronics",
    quantity: 20,
  }];
  assertEquals(actual, expected);
});

Deno.test("inserting two items into items table", () => {
  const inventory = new Inventory(createInventory());
  queryInventory(inventory, ["init"]);
  inventory.addItem("Keyboard", "electronics", 10);
  inventory.addItem("Mouse", "electronics", 20);
  const actual = queryInventory(inventory, ["list"]);
  const expected = [{
    id: 1,
    name: "Keyboard",
    category: "electronics",
    quantity: 10,
  }, {
    id: 2,
    name: "Mouse",
    category: "electronics",
    quantity: 20,
  }];
  assertEquals(actual, expected);
});
