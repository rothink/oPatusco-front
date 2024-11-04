// @ts-ignore
import Api from './Api';

class Author extends Api {
  constructor(url: string) {
    super(url);
  }
}

export default new Author('authors');
