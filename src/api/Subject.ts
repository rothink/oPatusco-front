// @ts-ignore
import Api from './Api';

class Subject extends Api {
  constructor(url: string) {
    super(url);
  }
}

export default new Subject('subjects');
