// @ts-ignore
import Api from './Api';

class User extends Api {
  constructor(url: string) {
    super(url);
  }
}

export default new User('users');
