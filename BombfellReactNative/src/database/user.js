'use strict';
import Realm from 'realm';

export default class User {}
User.schema = {
  name: 'User',
  properties: {
    username: 'string',
    userid: 'int',
    token: 'string',
  }
}
