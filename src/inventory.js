export const queryInventory = (inventory, args) => {
  if (inventory === undefined) {
    throw new Error("inventory does not exist");
  }
  return inventory;
};

export const createInventory = () => {
  return { tables: {} };
};

export const initInventory = (inventory) => {
  if (inventory.tables.items === undefined) {
    inventory.tables.items = [];
  }

  return inventory;
};
