import './app/i18n';
import 'antd/dist/antd.css';

import { Spin } from 'antd';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import App from './app/App';
import Dashboard from './app/page/dashboard/Dashboard';
import Guard from './app/page/guard/Guard';
import Login from './app/page/login/Login';
import GenericNotFound from './app/page/notFound/GenericNotFound';
import Register from './app/page/register/Register';
import Transaction from './app/page/transaction/Transaction';
import Wallet from './app/page/wallet/Wallet';
import { persistor, store } from './app/store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persistor}>
        <Suspense fallback={<Spin />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Guard />}>
                  <Route path="/" element={<Dashboard />} >
                    <Route path="/" element={<Wallet />} />
                    <Route path="/transaction" element={<Transaction />} />
                  </Route>
                </Route>
                <Route path='*' element={<GenericNotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

