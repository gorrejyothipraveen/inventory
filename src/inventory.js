export const queryInventory = (inventory, args) => {
  if (inventory === undefined) {
    throw new Error("inventory does not exist");
  }

  if (args[0] === "init") return initInventory(inventory);
  if (args[0] === "list") return itemsList(inventory);
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

export const itemsList = (inventory) => {
  return inventory.tables.items;
};
