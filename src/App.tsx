import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import MainPage from './pages/Main/Main';

function App() {
  return (
    <main aria-live="polite">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
