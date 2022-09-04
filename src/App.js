import React from 'react'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import DatasetsPage from './pages/datasetsPage';
import LabelsPage from './pages/labelsPage';
import LandingPage from './pages/landingPage';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="label" element={<LabelsPage />} />
          <Route path="datasets" element={<DatasetsPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
