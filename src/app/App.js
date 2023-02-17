import './app.css';
import { Outlet } from 'react-router-dom';
import { Bio } from '../components/bio/Bio';
import { Header } from '../components/header/Header';
import { Footer } from '../components/footer/Footer';

export const App = () => {
  return (
    <div className="App">
      <Header/>
      <div className='mainContent'>
        <Outlet />
        <Bio />
      </div>
      <Footer />
    </div>
  );
}

export default App;
