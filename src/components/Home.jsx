// import React from 'react';

// export const Home = () => {
//   return (
//     <header className='flex items-center justify-center h-screen'>
//       <h1 className='text-3xl md:text-5xl lg:text-7xl font-bold text-center mt-[-10%]'>
//         Scannez ou/et générez votre propre <span className='text-primary-100'>Code QR </span>  en un clic ! ✨ 
//       </h1>  
//     </header>
//   );
// };

import React from 'react';
import './../index.css'; // Assurez-vous d'importer le fichier CSS contenant les animations

export const Home = () => {
  return (
    <header className="flex items-center justify-center h-screen">
      <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center mt-[-12%] fixed fade-in">
        Scannez ou/et générez votre propre <span className="text-primary-100">Code QR</span> en un clic ! ✨
      </h1>
    </header>
  );
};

export default Home;
