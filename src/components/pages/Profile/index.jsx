import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className='text-center p-4'>Loading authentication...</div>;
  }

  // PROTECTED ROUTE: Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-center'>User Profile</h1>
      
      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
          <img 
            src={user.picture} 
            alt={user.name} 
            className='w-32 h-32 rounded-full border-4 border-blue-100'
          />
          
          <div className='flex-1'>
            <h2 className='text-2xl font-semibold text-gray-800'>{user.name}</h2>
            <p className='text-gray-600 mb-4'>{user.email}</p>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='font-bold text-gray-700 mb-2'>Email Verified</h3>
                <p className={user.email_verified ? 'text-green-600' : 'text-red-600'}>
                  {user.email_verified ? '✓ Verified' : '✗ Not Verified'}
                </p>
              </div>
              
              <div className='bg-gray-50 p-4 rounded-lg'>
                <h3 className='font-bold text-gray-700 mb-2'>Last Updated</h3>
                <p className='text-gray-600'>
                  {new Date(user.updated_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <details className='mt-8'>
          <summary className='cursor-pointer text-blue-600 font-medium'>
            View Full User Data (Debug)
          </summary>
          <pre className='mt-2 bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto'>
            {JSON.stringify(user, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default Profile;