import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className='navbar bg-base-100 shadow-sm container px-4 mx-auto flex justify-between items-center'>
      <div className='flex gap-2 items-center'>
        <span className='font-bold text-xl'>Volun<span className='text-yellow-600'>tee</span>r</span>
      </div>
      <div className='flex-1 flex justify-center'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <NavLink 
              className={({ isActive }) => isActive ? 'font-bold text-green-600 underline text-xl' : 'font-bold text-xl'}
              to='/'
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              className={({ isActive }) => isActive ? 'font-bold text-green-600 underline text-xl' : 'font-bold text-xl'}
              to='/all-posts'
            >
              All Post
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          {!user && (
            <li>
              <NavLink 
                className={({ isActive }) => isActive ? 'font-bold text-green-600 underline text-xl' : 'font-bold text-xl'}
                to='/login'
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>

        {user && (
          <div className='dropdown dropdown-end z-50'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div title={user?.displayName} className='w-10 rounded-full'>
                <img
                  referrerPolicy='no-referrer'
                  alt='User Profile Photo'
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <NavLink 
                  className={({ isActive }) => isActive ? 'justify-between font-bold text-green-600 underline' : 'justify-between font-bold'}
                  to='/add-volunteer-post'
                >
                  Add Need Volunteer
                </NavLink>
              </li>
              <li>
                <NavLink 
                  className={({ isActive }) => isActive ? 'font-bold text-green-600 underline ' : 'font-bold '}
                  to='/my-posts'
                >
                  My Posts
                </NavLink>
              </li>
              <li>
                <NavLink 
                  className={({ isActive }) => isActive ? 'font-bold text-green-600 underline' : 'font-bold'}
                  to='/myRequest'
                >
                  My Request
                </NavLink>
              </li>
              <li>
                <NavLink 
                  className={({ isActive }) => isActive ? 'font-bold text-green-600 underline' : 'font-bold'}
                  to='/volunteer-requests'
                >
                  Volunteer Request
                </NavLink>
              </li>
              <li className='mt-2 font-bold'>
                <button
                  onClick={logOut}
                  className='bg-gray-200 block text-center'
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
