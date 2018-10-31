import sales from '../database/sales';

const fields = ['id', 'attendantId', 'customerName', 'createdAt', 'totalPay'];

const tableData = {
  fields,
  records: sales
};
export default tableData;
