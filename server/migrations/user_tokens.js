// import users from '../database/users';

const fields = ['id', 'token', 'userId', 'createdAt'];

const fieldTypes = {
  id: 'integer',
  token: 'string',
  userId: 'integer',
  createdAt: 'date',
};

const tableData = {
  fields,
  fieldTypes,
  table: 'user_tokens',
};
export default tableData;
