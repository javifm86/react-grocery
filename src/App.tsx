import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main/Main';

function App() {
  return (
    <main aria-live="polite">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
