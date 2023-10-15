import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from './pages/UserList';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
