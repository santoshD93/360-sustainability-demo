import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { BrandList } from "./pages/BrandList";
import BrandScores from "./pages/BrandScores";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/brands" element={<BrandList />} />
      <Route path="/brands/:id" element={<BrandScores />} />
    </Routes>
  );
}

export default App;
