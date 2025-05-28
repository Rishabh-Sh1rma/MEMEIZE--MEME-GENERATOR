import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Templates from './pages/Templates';
import MyMemes from './pages/MyMemes';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import MemeCanvas from './components/editor/MemeCanvas'; // Import MemeCanvas editor
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/my-memes" element={<MyMemes />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          
          {/* Add this route for the editor */}
          <Route path="/editor" element={<MemeCanvas />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
