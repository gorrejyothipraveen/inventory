import { afterEach, beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { queryInventory } from "../src/query_inventory.js";
import { createInventory } from "../src/sqlite_inventory.js";
import * as inventoryFns from "../src/sqlite_inventory.js";
import { assertEquals } from "@std/assert";

describe("test on updates : ", () => {
  let inventory;
  beforeEach(() => {
    inventory = createInventory();
    queryInventory(inventory, inventoryFns, ["init"]);
  });

  afterEach(() => inventory.close());

  it("updating the quantity in id 1", () => {
    queryInventory(inventory, inventoryFns, [
      "add",
      "Mouse",
      "electronics",
      10,
    ]);
    queryInventory(inventory, inventoryFns, ["update", 1, 10]);
    const records = queryInventory(inventory, inventoryFns, ["list"]);
    const expected = 10;
    assertEquals(records[0].quantity, expected);
  });
});
