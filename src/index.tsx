import { render } from 'solid-js/web';
import App from './App';

const rootElement = document.getElementById('app');

if (rootElement) {
  render(() => <App />, rootElement);
} else {
  console.error('Root element with id "app" not found in document.');
}
