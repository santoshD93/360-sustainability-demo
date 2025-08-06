import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { BrandList } from './pages/BrandList';
import BrandScores from './pages/BrandScores';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brands/:id" element={<BrandScores />} />
        <Route path="/brands" element={<BrandList />} />
      </Routes>
    </>
  );
}

export default App;
