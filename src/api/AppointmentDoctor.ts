// @ts-ignore
import Api from './Api';

class AppointmentDoctor extends Api {
  constructor(url: string) {
    super(url);
  }
}

export default new AppointmentDoctor('appointments-doctor');
