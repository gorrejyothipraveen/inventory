export const queryInventory = (inventory,inventoryFns, args) => {
  if (inventory === undefined) {
    throw new Error("inventory does not exist");
  }

  const params = [...args.slice(1)];
  switch (args[0]) {
    case "init" :
      return inventoryFns.initInventory(inventory);
    case "list" :
      return inventoryFns.itemsList(inventory);
    case "add" :
      return inventoryFns.addItem(inventory, ...params);
  }
};
