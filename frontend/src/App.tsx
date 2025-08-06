import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { BrandList } from './pages/BrandList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/brands" element={<BrandList />} />
    </Routes>
  );
}

export default App;
