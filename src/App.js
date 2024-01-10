import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { StockDetailPage } from './pages/StockDetailPage';
import { StockOverviewPage } from './pages/StockOverviewPage';
import { NoPage } from './pages/NoPage';
import { AppProvider } from './context';

function App() {
  return (
    <main className='container'>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/detail/:symbol" element={<StockDetailPage />}/>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Router>
      </AppProvider>
    </main>
  );
}

export default App;
