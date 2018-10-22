import products from '../database/products';

const fields = ['id', 'name', 'quantityStocked', 'categoryId', 'price', 'createdAt', 'updatedAt'];

const tableData = {
  fields,
  records: products
};
export default tableData;
