export const queryInventory = (inventory, args) => {
  if (inventory === undefined) {
    throw new Error("inventory does not exist");
  }
  const params = [...args.slice(1)];

  switch (args[0]) {
    case "init":
      return inventory.initInventory();
    case "list":
      return inventory.itemsList();
    case "add":
      return inventory.addItem(...params);
    case "update":
      return inventory.updateItemQuantity(...params);
  }
};
