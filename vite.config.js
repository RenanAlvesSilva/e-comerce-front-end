export default {
    server: {
      port: process.env.PORT || 4173,  // Garantir que o Vite use a variável PORT fornecida pelo Railway
    },
    base: './',  // Necessário para SPAs
  };
  