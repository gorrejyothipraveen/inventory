import { assertEquals } from '@std/assert';
import { queryInventory } from "../src/inventory.js";

Deno.test('simple test :', () => {
  assertEquals(queryInventory(inventory, "init"), '')
});