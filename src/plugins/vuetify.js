import 'vuetify/styles';
import {createVuetify} from 'vuetify';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'primeIt',
    themes: {
      primeIt: {
        dark: false,
        colors: {
          primary: '#54D10D',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
    },
  },
  defaults: {
    VTextField: {
      color: 'primary',
    },
    VSelect: {
      color: 'primary',
    },
  },
});

export default vuetify;
