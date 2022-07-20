import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import 'antd/dist/antd.css'
import App from './App';
import routes from './routes'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Router>
  <Routes>
    <Route path="/" element={<App />}>
      {
        routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))
      }
    </Route>
  </Routes>
</Router>);

