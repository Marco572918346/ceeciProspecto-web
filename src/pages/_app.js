import '@/styles/globals.css'
import Drawer from '../../components/Drawer';

export default function App({ Component, pageProps }) {
  return (
    <Drawer>
      <Component {...pageProps} />
    </Drawer>
  );
  
}

