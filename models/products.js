let products = [];

function findById(id) {
  return products.find(p => p.id === id);
}

function add(product) {
  products.push(product);
}

function update(id, data) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...data };
  return products[index];
}

function remove(id) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

module.exports = {
  products,
  findById,
  add,
  update,
  remove
};
