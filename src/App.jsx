import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Sidebar } from './components/Sidebar';
import { Generator } from './components/Generator';
import { Scanner } from './components/Scanner';
import { useState } from 'react';
import backgroundImage from './../src/assets/background.jpg';

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className='flex min-h-screen'>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main 
          className={`flex-1 p-2 overflow-y-scroll h-screen transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-20'}`} 
          style={{ 
            backgroundImage: `url(${backgroundImage})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'lighten' // Optional: To blend the background color and image
          }}
        >
          <Routes>
            <Route exact path='/' Component={Home}/>
            <Route path='/generator' Component={Generator}/>
            <Route path='/scanner' Component={Scanner}/>
          </Routes>    
        </main>
      </div>
    </Router>
  );
}

export default App;
