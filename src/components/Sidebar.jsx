import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAdd, faFileAlt, faQrcode, faBars, faTimes, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

export const Sidebar = ({ open, setOpen }) => {
  const Menus = [
    { title: 'Accueil', icon: faHome, path: '/' },
    { title: 'Générer', icon: faFileAlt, path: '/generator' },
    { title: 'Scanner', icon: faQrcode, path: '/scanner' }
  ];

  const location = useLocation();

  return (
    <>
      <div className={`bg-primary-900 h-full fixed ${open ? 'w-72' : 'w-20 '} transition-all duration-300 z-50`}>
        <div className={`flex items-center rounded-tr-[100px] ${open ? 'justify-between pt-4' : 'justify-center pt-40'} bg-primary-300 p-4`}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className={`cursor-pointer mt-3 rounded-full p-2 bg-white text-primary-900 transition-transform ${!open && 'rotate-180'}`}
            onClick={() => setOpen(!open)}
          />
          {open && <h1 className="text-white mt-3 font-bold text-4xl ml-2 mr-10">Code QR </h1>}
        </div>
        <div className="bg-primary-300 h-full overflow-y-scroll no-scrollbar flex flex-col justify-between gap-8 p-4">
          <nav className="flex flex-col gap-5">
            {Menus.map((menu, index) => (
              <NavLink
                key={index}
                to={menu.path}
                className={`flex items-center gap-4 text-white py-2 px-4 rounded-xl hover:bg-primary-900/50 transition-colors ${location.pathname === menu.path ? 'bg-primary-900' : ''}`}
              >
                <div className="flex items-center justify-center w-8 h-8">
                  <FontAwesomeIcon icon={menu.icon} />
                </div>
                <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
              </NavLink>
              
            ))}
          </nav>
        </div>
      </div>
      <button
        className="lg:hidden fixed right-4 bottom-4 text-2xl bg-primary-900 p-2.5 rounded-full text-white z-50"
        onClick={() => setOpen(!open)}>
        {open ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </button>
    </>
  );
};

export default Sidebar;
