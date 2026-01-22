export const createInventory = () => {
  return { tables: {} };
};

export class Inventory{
  constructor(inventory) {
    this.inventory = inventory;
  }

  initInventory = () => {
    if (this.inventory.tables.items === undefined) {
      this.inventory.tables.items = [];
    }
    return;
  };

  itemsList = () => {
    return this.inventory.tables.items;
  };

  addItem = ( name, category, quantity) => {
    const id = this.inventory.tables.items.length + 1;
    const record = { id, name, category, quantity };
    this.inventory.tables.items.push(record);
    return this.inventory;
  };

  updateItem = (id, newQuantity) => {
    const items = this.inventory.tables.items;
    for(const item of items) {
      if(item.id === id) {
        item.quantity = newQuantity
      }
    }
  }

  close () {
    this.inventory = [];
  }

}
