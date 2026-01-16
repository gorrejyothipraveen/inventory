import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { queryInventory } from "../src/query_inventory.js";
import { createInventory } from "../src/sqlite_inventory.js";
import * as inventoryFns from "../src/sqlite_inventory.js";
import { assertEquals } from "@std/assert";

describe("adding the items into items table in inventory", () => {
  let inventory;
  beforeEach(() => {
    inventory = createInventory();
    queryInventory(inventory, inventoryFns, ["init"]);
  });

  afterEach(() => inventory.close());

  it("inserting the one row into items table", () => {
    queryInventory(inventory, inventoryFns, [
      "add",
      "Mouse",
      "electronics",
      10,
    ]);
    const actual = queryInventory(inventory, inventoryFns, ["list"]);
    const expected = 1;
    assertEquals(actual.length, expected);
  });

  it("inserting two rows into items table", () => {
    queryInventory(inventory, inventoryFns, [
      "add",
      "Mouse",
      "electronics",
      10,
    ]);
    queryInventory(inventory, inventoryFns, [
      "add",
      "Keyboard",
      "electronics",
      10,
    ]);
    const actual = queryInventory(inventory, inventoryFns, ["list"]);
    const expected = 2;
    assertEquals(actual.length, expected);
  });
});
