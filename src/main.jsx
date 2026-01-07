import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react'; 
import './index.css';
import { App } from './App.jsx';
import { ProvideAppContext } from './context/AppContext.jsx';

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <ProvideAppContext>
      <App />
    </ProvideAppContext>
  </Auth0Provider>
);