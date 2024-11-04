import {useToast} from "vue-toastification";

const toast = useToast();


export default {


  /**
   * Mostra apenas um erro
   * @param error
   */
  showError(error) {
    toast.error(error, { timeout: 20000, });
  },

  /**
   * Mostra apenas uma mensagem de sucesso
   * @param msg
   */
  showSuccessMsg(msg: any): void {
    toast.success(msg);
  },

  /**
   * Mostra warnings
   * @param msg
   */
  showWarning(msg) {
    toast.warning(msg);
  },

  showInfoMsg(msg) {
    toast.info(msg);
  },

  /**
   * Mostra mensagem de sucesso
   * @param success
   */
  showSuccess(success) {
    if (success.hasOwnProperty('data') && success.data.hasOwnProperty('message')) {
      if (success.data.type == 'success') {
        this.showSuccessMsg(success.data.message);
        return;
      }
    }
  },

  /**
   * Trata o array de erros do serve
   * @param error
   */
  showErrors(error) {
    console.info(error,'eror?')
    /**
     * Se usuário não estiver autenticado no sistema
     */
    if(error.status === 401) {
      this.showError('Usuário não autenticado. Faça o login novamente');
      return;
    }

    if (error.hasOwnProperty('data') && error.data.hasOwnProperty('status')) {
      if (error.data.status === 'error') {
        let erros = '';
        if (Array.isArray(error.data.errors)) {
          error.data.errors.forEach(error => {
            erros += error + '\n';
          });
        } else if(typeof error.data.errors === 'object') {
          Object.entries(error.data.errors).forEach(
            ([key, value]) => erros += value + '\n'
          );
        } else {
          erros = error.data.message
        }

        this.showError(erros);
      }
      return;
    }

    /**
     * Se for apenas um erro, mostra o único
     */
    if (error.hasOwnProperty('data') && error.data.hasOwnProperty('error')) {
      if (error.data.error.hasOwnProperty('message')) {
        this.showError(error.data.error.message);
      }
      return;
    }

    /**
     * Se tiver paenas a mensagem, então motra a mensagem!
     */
    if (error.hasOwnProperty('message')) {
      this.showError(error.message);
      return;
    }

    /**
     * Se for vários errors, então varre o array e mostra todos
     */
    if (error.hasOwnProperty('data') && error.data.hasOwnProperty('errors')) {
      if (error.data.errors.hasOwnProperty('message')) {
        error.data.errors.message.map(error => {
          this.showError(error);
        });
      }
      // varre array com estrutura chave valor
      else {
        let erros = '';
        Object.entries(error.data.errors).forEach(
          ([key, value]) => erros += value + '\n'
        );

        this.showError(erros);
      }
      return;
    }

    /**
     * Se for vários errors, então varre o array e mostra todos
     */
    if (error.hasOwnProperty('errors')) {
      if (error.errors.hasOwnProperty('message')) {
        error.errors.message.map(error => {
          this.showError(error);
        });
      }
      return;
    }

    /**
     * Se não existir a propriedade error, então verifica se existe a propriedade message
     * Questão de autorização do  usuário
     */
    if (error.hasOwnProperty('data') && error.data.hasOwnProperty('message')) {
      this.showError(error.data.message);
    }
  },
};
