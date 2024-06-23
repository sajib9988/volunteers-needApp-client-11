
import { useContext } from 'react'


import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthProvider/AuthProvider';
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className='navbar bg-base-100 shadow-sm container px-4 mx-auto'>
      <div className='flex-1'>
        <Link to='/' className='flex gap-2 items-center'>

          <span className='font-bold'>Volunteer</span>
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <Link className='font-bold ' to='/'>Home</Link>
          </li>
          <li>
            <Link className='font-bold' to='/all-posts'>All Post</Link>
          </li>

          {!user && (
            <li>
              <Link to='/login'>Login</Link>
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
                <Link to='/add-volunteer-post' className='justify-between fond-bold'>
                  Add Need Volunteer
                </Link>
              </li>
              <li>
                <Link to='/my-posts'>My Posts</Link>
              </li>
              <li>
                <Link to='/myRequest'>My Request</Link>
              </li>
              <li>
                <Link to='/volunteer-requests'>Volunteer Request</Link>
              </li>
              <li className='mt-2'>
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
  )
}

export default Navbar