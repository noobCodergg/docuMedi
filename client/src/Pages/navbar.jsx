import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { handleRate, logOut } from '@/Api/authApi';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { role, setRole, userId } = useContext(UserContext);
  const navigate = useNavigate();

  if (!role) {
    setRole(localStorage.getItem('role'));
  }

  const handleLogout = async () => {
    try {
      await logOut();
      setRole(null);
      localStorage.removeItem('role');
      navigate('/login');
    } catch (error) {
      console.log('Logout failed:', error);
    }
  };

  return (
    <>
      <nav className="bg-orange-800 py-4 px-6 md:px-12 flex items-center justify-between shadow-md">
        {/* Left: Logo + Links */}
        <div className="flex items-center space-x-6">
          <div className="text-2xl font-bold text-orange-600">docuMedi</div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <Link
              to="/"
              className="text-white hover:text-orange-600 font-semibold transition-colors duration-300"
            >
              Home
            </Link>

            {role === 'admin' && (
              <>
                <Link
                  to="/upload-doctor"
                  className="text-white hover:text-orange-600 font-semibold transition-colors duration-300"
                >
                  Upload Doctor
                </Link>

              </>
            )}

            {role === 'user' && (
              <>
                <Link
                  to="/card"
                  className="text-white hover:text-orange-600 font-semibold transition-colors duration-300"
                >
                  Card
                </Link>
                <Link
                  to="/upload"
                  className="text-white hover:text-orange-600 font-semibold transition-colors duration-300"
                >
                  Upload
                </Link>
                <Link
                  to="/documents"
                  className="text-white hover:text-orange-600 font-semibold transition-colors duration-300"
                >
                  Documents
                </Link>

                 <Link
                  to="/appointment"
                  className="text-white hover:text-orange-600 font-semibold transition-colors duration-300"
                >
                  Create Appointment
                </Link>


                <Link
                  to="/upload-personal-data"
                  className="text-white hover:text-orange-600 font-semibold transition-colors duration-300"
                >
                  Upload Track Record
                </Link>

                <Link
                  to="/record"
                  className="text-white hover:text-orange-600 font-semibold transition-colors duration-300"
                >
                  View record
                </Link>


                <Link
                  to="/doctor-list"
                  className="text-white hover:text-orange-600 font-semibold transition-colors duration-300"
                >
                  Doctors
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Right: Login/Logout Button */}
        <div>
          {role ? (
            <Button
              onClick={handleLogout}
              variant="default"
              className="text-white border-white hover:bg-orange-600 hover:text-white transition"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button
                variant="default"
                className="text-white border-white hover:bg-orange-600 hover:text-white transition"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
