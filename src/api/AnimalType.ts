// @ts-ignore
import Api from './Api';

class AnimalType extends Api {
  constructor(url: string) {
    super(url);
  }
}

export default new AnimalType('animal-types');
