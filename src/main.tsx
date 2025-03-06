import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { addLocale, locale, PrimeReactProvider } from 'primereact/api';
import './index.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import Router from './routes/Router';

addLocale('pt-BR', {
  matchAll: "Correspondência Completa",
  matchAny: "Qualquer Correspondência",
  addRule: "Adicionar Regra",
  removeRule: "Remover Regra",
  clear: "Limpar",
  apply: "Aplicar"
});
locale('pt-BR');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ locale: "pt-BR", unstyled: false, ripple: true }}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </PrimeReactProvider>
  </React.StrictMode>
);
