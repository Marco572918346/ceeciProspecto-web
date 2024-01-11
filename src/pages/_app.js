import '@/styles/globals.css'
import { Drawer } from '@mui/material';

export default function App({ Component, pageProps }) {
  return (
    <Drawer>
      <Component {...pageProps} />
    </Drawer>
  );
}
