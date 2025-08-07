import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { BrandList } from './pages/BrandList';
import BrandScores from './pages/BrandScores';
import ClaimAnalyzer from './components/ClaimAnalyzer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/brands" element={<BrandList />} />
      <Route path="/brands/:id" element={<BrandScores />} />
      <Route path="/analyze" element={<ClaimAnalyzer />} />
    </Routes>
  );
}

export default App;
