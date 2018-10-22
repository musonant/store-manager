import users from '../database/users';

const fields = ['id', 'userType', 'email', 'createdAt', 'updatedAt'];

const tableData = {
  fields,
  records: users
};
export default tableData;
