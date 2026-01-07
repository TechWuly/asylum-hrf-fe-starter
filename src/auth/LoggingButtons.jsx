import { useAuth0 } from '@auth0/auth0-react';

export const LoggingButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogging = () => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    } else {
      loginWithRedirect();
    }
  };

  const buttonText = isAuthenticated ? 'Log Out' : 'Log In';

  return (
    <button className='nav-btn px-4 py-1' onClick={handleLogging}>
      {buttonText}
    </button>
  );
};