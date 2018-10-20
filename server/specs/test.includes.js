import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';

const request = supertest(app);

const includes = {
  expect,
  request
};

export default includes;
