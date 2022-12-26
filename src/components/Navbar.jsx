import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { AiOutlineClose,AiOutlineMenu } from 'react-icons/ai';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const {user, logOut} = UserAuth();
  const navigate = useNavigate();

  const handleNav = () =>{
    setNav(!nav)
  }

  const handleSignOut = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className='sticky top-0 rounded-div flex items-center justify-between h-20 font-bold'>
      <Link to='/'>
        <h1 className='text-2xl '>CryptoPad</h1>
      </Link>
      <div className='hidden md:block'>
        <ThemeToggle />
      </div>

      {user?.email ? (
        <div>
          <Link to='/account' className='p-4'>Account</Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div className='hidden md:block'>
        <Link to='/signin' className='p-4 hover:text-accent'>Sign in</Link>
        <Link to='/signup'className='bg-button text-indigo-700 px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl'>Sign up</Link>
      </div>
      )}

      {/* Menu Icon */}
      <div onClick={handleNav} className='block md:hidden cursor-pointer z-10'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Menu */}
      <div className={nav ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10' : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'}>
        <ul className='w-full p-4'>
          <li onClick={handleNav} className='border-b py-6'><Link to='/'>Home</Link></li>
          <li onClick={handleNav} className='border-b py-6'><Link to='/account'>Account</Link></li>
          <li onClick={handleNav} className='py-6'><ThemeToggle /></li>
        </ul>
        <div className='flex flex-col w-full p-4 '>
          <Link to='signin'>
            <button onClick={handleNav} className='w-full my-2 p-3 bg-primary text-primary boarder boarder-secondary rounded-2xl shadow-xl'>Sign in</button>
          </Link>
          <Link to='signUp'>
            <button onClick={handleNav} className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl'>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
