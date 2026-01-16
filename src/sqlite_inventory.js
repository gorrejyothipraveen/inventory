import { DatabaseSync } from "node:sqlite";

export const createInventory = () => {
  const inventory = new DatabaseSync(":memory:");
  return inventory;
};

export const initInventory = (inventory) => {
  inventory.exec(
    `CREATE TABLE IF NOT EXISTS items(
          item_id INTEGER PRIMARY KEY AUTOINCREMENT,
          item_name TEXT UNIQUE NOT NULL,
          category TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          last_updated_time TEXT
        ) STRICT;
      `,
  );
};

export const itemsList = (inventory) => {
  const selectQuery = `SELECT * FROM items`;
  const statements = inventory.prepare(selectQuery);
  const records = statements.all();
  return records;
};

export const addItem = (inventory, itemName, category, quantity) => {
  const id = itemsList(inventory).length + 1;
  const query =
    `INSERT into items (item_id, item_name, category, quantity, last_updated_time) values (?, ?, ?,?, ?);`;
  const insertInfo = inventory.prepare(query).run(
    id,
    itemName,
    category,
    quantity,
    new Date().toISOString(),
  );
  return insertInfo;
};

export const updateItemQuantity = (inventory, id, newQuantity) => {
  const query = `UPDATE items set quantity = ? where item_id = ?`;
  const updateInfo = inventory.prepare(query).run(newQuantity, id);
  return updateInfo;
}

