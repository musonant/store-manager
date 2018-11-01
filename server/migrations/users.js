// import users from '../database/users';

const fields = ['id', 'userType', 'email', 'createdAt', 'updatedAt'];

const fieldTypes = {
  id: 'integer',
  userType: 'string',
  email: 'string',
  createdAt: 'date',
  totalPay: 'date',
};

const tableData = {
  fields,
  fieldTypes,
  table: 'users',
};
export default tableData;
