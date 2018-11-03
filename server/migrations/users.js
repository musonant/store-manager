// import users from '../database/users';

const fields = ['id', 'userType', 'email', 'password', 'createdAt', 'updatedAt'];

const fieldTypes = {
  id: 'integer',
  userType: 'string',
  email: 'string',
  password: 'string',
  createdAt: 'date',
  totalPay: 'date',
};

const tableData = {
  fields,
  fieldTypes,
  table: 'users',
};
export default tableData;
