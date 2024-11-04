// @ts-ignore
import Api from "@/api/Api";

class Auth extends Api {
  constructor(url: string) {
    super(url);
  }

  async me() {
    return await super.get(`${super.getUrl()}/me`).then((res: any) => super.success(res));
  }

  async login(form: any) {
    return super.post(`${super.getUrl()}/login`, form).then((res: any) => super.success(res));
  }

  async logout(form: any) {
    return await super.post(`${super.getUrl()}/logout`, form).then((res: any) => super.success(res));
  }

  async register(form: any) {
    return await super.post(`${super.getUrl()}/register`, form).then((res: any) => super.success(res));
  }
}

export default new Auth('auth');
