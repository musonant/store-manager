

const fields = ['id', 'name', 'quantityInStock', 'categoryId', 'price', 'createdAt', 'updatedAt'];
const fieldTypes = {
  id: 'integer',
  name: 'string',
  quantityInStock: 'integer',
  categoryId: 'integer',
  price: 'integer',
  createdAt: 'date',
  updatedAt: 'date',
};

const tableData = {
  fields,
  fieldTypes,
  table: 'products',
};
export default tableData;
