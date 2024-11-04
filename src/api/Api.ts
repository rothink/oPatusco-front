import axios from 'axios';
import Swal from 'sweetalert2'
import notification from "@/helpers/notification";
import url from "@/helpers/url";

export default class Api {
  protected url: string;

  constructor(url: string) {
    this.url = url;
  }

  /**
   * Retorna todos os items
   * @returns {Promise<T|{description: *, error: *, status: boolean}|*>}
   */
  async getAll(filter = {}) {
    try {
      const filterUrl = url.getFilterURL(filter);
      return await axios.get(`${this.url}?${filterUrl}`).then((res) => ({
        status: true,
        data: res.data,
      })).catch((err) =>
        // notification.showErrors(err);
        ({
          status: false,
          error: err.message,
          description: err.response.data.message,
        }));
    } catch (error) {
      return error;
    }
  }

  /**
   * Retorna apenas um item da entidade
   * Show
   * @param id
   * @returns {Promise<T|{description: *, error: *, status: boolean}|boolean|{description: null, error: *, status: boolean}>}
   */
  async find(id: number | string) {
    try {
      return await axios.get(`${this.url}/${id}`).then((res) => ({
        status: res.status,
        data: res.data,
      })).catch((err) =>
        // notification.showErrors(err);
        ({
          status: false,
          error: err.message,
          description: err.response.data.message,
        }));
    } catch (error) {
      return {
        status: false,
        error,
        description: null,
      };
    }
  }

  /**
   * Update de entidade
   * @param id
   * @param data
   * @returns {Promise<{data: any, message: *, status: boolean}|{error: *, message: *, status: boolean}|*>}
   */
  async update(id: string|number, data: any) {
    try {
      return await axios
        .put(`${this.url}/${id}`, data)
        .then((res: any) => this.success(res))
        .catch((err) => this.fail(err));
    } catch (error) {
      return error;
    }
  }

  /**
   * Salvando entidade
   * @param data
   * @returns {Promise<{data: any, status: boolean}|{description: *, error: *, status: boolean}|*>}
   */
  async save(data: any) {
    try {
      return await axios
        .post(this.url, data)
        .then((res: any) => this.success(res))
        .catch((err) => this.fail(err));
    } catch (error) {
      return error;
    }
  }

  /**
   * Deletando entidade
   * @param id
   * @returns {Promise<T|T>}
   */
  async destroy(id: number) {
    return await Swal.fire({
      title: 'Deseja excluir?',
      text: 'Cuidado, exclusão permanente',
      icon: 'error',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
    }).then(async (result: any) => {
      if (result.value) {
        return await axios.delete(`${this.url}/${id}`).then(res => {
          if (res.data.type === 'success') {
            Swal.fire(
              {
                title: 'Excluído',
                icon: 'success',
                confirmButtonText: 'Fechar',
                timer: 1500,
                confirmButtonColor: '#3085d6',
              })

            return this.success(res);
          } else {
            Swal.fire('Item não excluído', '', 'error');
            return {
              status: false,
              ok: false
            };
          }
        }).catch(err => {
          this.fail(err)
        });
      } else {
        return {
          status: false,
        };
      }
    });
  }

  /**
   * Busca os pré-requisitos da entidade
   * @returns {Promise<T|{description: *, error: *, status: boolean}|{description: null, error: *, status: boolean}>}
   */
  async preRequisite(id = null) {
    try {
      let url = `${this.url}/pre-requisite`;
      if (id) {
        url = `${url}/${id}`;
      }
      return await axios
        .get(url)
        .then((res) => this.success(res))
        .catch((err) => this.fail(err));
    } catch (error) {
      return {
        status: false,
        error,
        description: null,
      };
    }
  }

  async toSelect() {
    try {
      let url = `${this.url}/to-select`;
      return await axios
        .get(url)
        .then((res) => this.success(res))
        .catch((err) => this.fail(err));
    } catch (error) {
      return {
        status: false,
        error,
        description: null,
      };
    }
  }

  async success(success: any) {
    notification.showSuccess(success);
    return {
      ok: true,
      ...success,
    };
  }

  fail(error: any) {
    notification.showErrors(error);
    return {
      ok: false,
      error,
    }
  }

  async post(url: string, form: any) {
    return await axios.post(url, form);
  }

  async put(url: string, form: any) {
    return await axios.put(url, form);
  }

  async get(urlBase: string, query: any, headers: { }) {
    if (query === undefined || query === null) {
      query = {}
    }
    const filterUrl = url.getFilterURL(query);
    let uri = filterUrl ?  `${urlBase}?${filterUrl}` : urlBase
    if (uri.slice(-1) === '?') {
      uri = uri.slice(0, -1);
    }
    return await axios.get(`${uri}`, {headers});
  }

  async delete(url: string, query: any) {
    const uri = query === undefined ? url : `${url}/${query}`
    return await axios.delete(`${uri}`);
  }

  async remove(id) {
    return await axios.delete(`${this.url}/${id}`).then(res => {
      if (res.data.type === 'success') {
        Swal.fire(
          {
            title: 'Excluído',
            icon: 'success',
            confirmButtonText: 'Fechar',
            timer: 1500,
            confirmButtonColor: '#3085d6',
          })

        return {
          status: true,
          ok: true
        };
      } else {
        Swal.fire('Item não excluído', '', 'error');
        return {
          status: false,
          ok: false
        };
      }
    }).catch(err => {
      this.fail(err)
    });
  }

  getUrl() {
    return this.url;
  }
}
