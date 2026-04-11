import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { ToolPage } from './pages/ToolPage';
import { AdvancedToolPage } from './pages/AdvancedToolPage';
import { HistoryPage } from './pages/HistoryPage';
import { ScrollToTop } from './components/ScrollToTop';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tool/:id" element={<ToolPage />} />
          <Route path="advanced/:id" element={<AdvancedToolPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
