// @ts-ignore
import Api from './Api';

class Appointment extends Api {
  constructor(url: string) {
    super(url);
  }
}

export default new Appointment('appointments');
