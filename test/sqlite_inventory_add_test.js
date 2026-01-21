import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { queryInventory } from "../src/query_inventory.js";
import { createInventory, Inventory} from "../src/sqlite_inventory.js";
import { assertEquals } from "@std/assert";

describe("adding the items into items table in inventory", () => {
  let inventory;
  beforeEach(() => {
    inventory = new Inventory(createInventory())
    queryInventory(inventory, ["init"]);
  });

  afterEach(() => inventory.close());

  it("inserting the one row into items table", () => {
    queryInventory(inventory, [
      "add", 
      "Mouse",
      "electronics",
      10,
    ]);
    const actual = queryInventory(inventory, ["list"]);
    const expected = 1;
    assertEquals(actual.length, expected);
  });

  it("inserting two rows into items table", () => {
    queryInventory(inventory, [
      "add",
      "Mouse",
      "electronics",
      10,
    ]);
    queryInventory(inventory, [
      "add",
      "Keyboard",
      "electronics",
      10,
    ]);
    const actual = queryInventory(inventory, ["list"]);
    const expected = 2;
    assertEquals(actual.length, expected);
  });
});
