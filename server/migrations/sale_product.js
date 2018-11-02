// import sales from '../database/sales';

const fields = ['salesId', 'productId', 'quantity'];

const fieldTypes = {
  salesId: 'integer',
  productId: 'integer',
  quantity: 'integer',
};

const tableData = {
  fields,
  fieldTypes,
  table: 'sale_product',
};
export default tableData;
