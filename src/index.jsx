/* @refresh reload */
import { render } from 'solid-js/web';
import { Router, hashIntegration } from "@solidjs/router";

import './index.css';
import App from './App';

render(
    () => (
      <Router source={hashIntegration()}>
        <App />
      </Router>
    ),
    document.getElementById("root")
  );
