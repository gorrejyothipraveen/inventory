import { assertEquals, assertThrows } from "@std/assert";
import {
  createInventory,
  initInventory,
  queryInventory,
} from "../src/inventory.js";

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
  const inventory = createInventory();
  initInventory(inventory);
  const result = {
    tables: {
      items: [],
    },
  };
  assertEquals(inventory, result);
});

Deno.test(`including it in the queryInventory , 
  if choice is init then it will initializes the items table , it already exist it won't create`, () => {
  const inventory = createInventory();
  queryInventory(inventory, ["init"]);
  const result = {
    tables: {
      items: [],
    },
  };
  assertEquals(inventory, result);
});

Deno.test('retrieving the existing row from the items table', () => {
  const inventory = createInventory();
  queryInventory(inventory, "init");
  const record = {
    id : 1,
    name : 'Keyboard',
    category : 'electronics',
    quantity : 10
  }
  inventory.tables.items = record;
  assertEquals(inventory.tables.items, record)
});

Deno.test('retrieving rows , here two rows are added one is Keyboard and second one monitor', () => {
  const inventory = createInventory();
  queryInventory(inventory, ["init"]);
  const record1 = {
    id : 1,
    name : 'Keyboard',
    category : 'electronics',
    quantity : 10
  }
  const record2 = {
    id : 1,
    name : 'Mouse',
    category : 'electronics',
    quantity : 20
  }

  inventory.tables.items.push(record1);
  inventory.tables.items.push(record2);
  assertEquals(inventory.tables.items, [record1, record2])
});
