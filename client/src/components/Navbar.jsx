import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from './../assets/assets';
import { Search, X, Menu, TicketPlus } from 'lucide-react';
import { useClerk, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, openSignIn } = useClerk();
  const navigate = useNavigate();

  return (
    <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-[#09090B]'>
      <Link to='/' className='max-md:flex-1'>
        <img src={assets.logo} alt="Logo" className='w-36 h-auto' />
      </Link>

      <div className={`z-50 flex flex-col md:flex-row items-center gap-8 md:px-8 py-3 md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 max-md:fixed max-md:top-0 max-md:left-0 max-md:h-screen max-md:justify-center max-md:font-medium max-md:text-lg transition-all duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0 max-md:overflow-hidden'}`}>
        <X className='md:hidden absolute top-6 right-6 w-6 h-6 text-white cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/'>Home</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/movies'>Movies</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/theaters'>Theaters</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/releases'>Releases</Link>
        <Link onClick={() => { scrollTo(0, 0); setIsOpen(false); }} to='/favorites'>Favorites</Link>
      </div>

      <div className='flex items-center gap-8'>
        <Search className='w-6 h-6 text-white hidden sm:inline cursor-pointer' />
        {!user ? (
          <button
            onClick={openSignIn}
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
                onClick={() => navigate('/my-bookings')}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      <Menu className='max-md:ml-4 md:hidden w-8 h-8 text-white cursor-pointer' onClick={() => setIsOpen(!isOpen)} />
    </div>
  );
};

export default Navbar;
