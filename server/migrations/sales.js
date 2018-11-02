// import sales from '../database/sales';

const fields = ['id', 'attendantId', 'customerName', 'createdAt', 'totalPay'];

const fieldTypes = {
  id: 'integer',
  attendantId: 'integer',
  customerName: 'string',
  createdAt: 'date',
  totalPay: 'date',
};

const tableData = {
  fields,
  fieldTypes,
  table: 'sales',
};
export default tableData;
