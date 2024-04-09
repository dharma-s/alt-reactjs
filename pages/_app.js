import "@/styles/globals.css";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from '../store/store';

export default function App({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
