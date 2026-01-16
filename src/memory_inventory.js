export const createInventory = () => {
  return { tables: {} };
};

export const initInventory = (inventory) => {
  if (inventory.tables.items === undefined) {
    inventory.tables.items = [];
  }

  return inventory;
};

export const itemsList = (inventory) => {
  return inventory.tables.items;
};

export const addItem = (inventory, name, category, quantity) => {
  const id = inventory.tables.items.length + 1;
  const record = { id, name, category, quantity };
  inventory.tables.items.push(record);
  return inventory;
};

// export const updateItem = (inventory, id, newCategory) => {
//   for(const item of inventory.tables.items) {
//     if(item.id === id) {
//       item.category = newCategory;
//     }
//   }
// }