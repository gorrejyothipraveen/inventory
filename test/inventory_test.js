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
  queryInventory(inventory);
  initInventory(inventory);
  const result = {
    tables: {
      items: [],
    },
  };
  assertEquals(inventory, result);
});
