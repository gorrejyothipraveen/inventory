import { DatabaseSync } from "node:sqlite";

export const createInventory = () => {
  const inventory = new DatabaseSync(":memory:");
  return inventory;
};

export class Inventory {
  constructor(inventory) {
    this.inventory = inventory;
  }

  initInventory = () => {
    this.inventory.exec(
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

  itemsList = () => {
    const selectQuery = `SELECT * FROM items`;
    const statements = this.inventory.prepare(selectQuery);
    const records = statements.all();
    return records;
  };

  addItem = (itemName, category, quantity) => {
    const id = this.itemsList().length + 1;
    const query =
      `INSERT into items (item_id, item_name, category, quantity, last_updated_time) values (?, ?, ?, ?, ?);`;
    const insertInfo = this.inventory.prepare(query).run(
      id,
      itemName,
      category,
      quantity,
      new Date().toISOString(),
    );
    return insertInfo;
  };

  updateItemQuantity = (id, newQuantity) => {
    const query = `UPDATE items set quantity = ? where item_id = ?`;
    const updateInfo = this.inventory.prepare(query).run(newQuantity, id);
    return updateInfo;
  };

  retrieveDB() {
    return this.inventory;
  }

  close() {
    this.inventory.close();
  }
}
