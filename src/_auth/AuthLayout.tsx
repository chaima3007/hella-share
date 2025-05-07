import { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { account } from '../lib/appwrite/config'; // Assure-toi que ce chemin est correct

const AuthLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await account.get();
        if (user) {
          setIsAuthenticated(true);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  return isAuthenticated ? (
    <Navigate to="/" replace state={{ from: location }} />
  ) : (
    <div className="flex min-h-screen">
      <section className="flex flex-1 items-center justify-center flex-col py-10">
        <Outlet />
      </section>
      <img
        src="/assets/images/side-img.svg"
        alt="Illustration"
        className="hidden xl:block h-screen w-1/2 object-cover"
      />
    </div>
  );
};

export default AuthLayout;
