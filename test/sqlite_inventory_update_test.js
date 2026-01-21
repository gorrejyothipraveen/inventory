import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { queryInventory } from "../src/query_inventory.js";
import { createInventory, Inventory } from "../src/sqlite_inventory.js";

import { assertEquals } from "@std/assert";

describe("test on updates : ", () => {
  let inventory;
  beforeEach(() => {
    inventory = new Inventory(createInventory())
    queryInventory(inventory, ["init"]);  
  });

  afterEach(() => inventory.close());

  it("updating the quantity in id 1", () => {
    queryInventory(inventory, [
      "add",
      "Mouse",
      "electronics",
      10,
    ]);
    queryInventory(inventory, ["update", 1, 11]);
    const records = queryInventory(inventory, ["list"]);
    const expected = 11;
    assertEquals(records[0].quantity, expected);
  });

  it("updating the quantity(10) in id 1 to 20", () => {
    queryInventory(inventory, [
      "add",
      "Mouse",
      "electronics",
      10,
    ]);
    queryInventory(inventory, ["update", 1, 20]);
    const records = queryInventory(inventory, ["list"]);
    const expected = 20;
    assertEquals(records[0].quantity, expected);
  });
});
