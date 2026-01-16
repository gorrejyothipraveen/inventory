import { DatabaseSync } from 'node:sqlite'

export const createInventory = () => {
  const inventory = new DatabaseSync(':memory:');
  return inventory;
}

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
}