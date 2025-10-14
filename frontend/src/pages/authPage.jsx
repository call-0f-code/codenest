
import React, { useState } from 'react';
import { ChevronRight, Mail, Lock } from 'lucide-react';

export default function AuthPortal() {
  const [currentPage, setCurrentPage] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col" style={{backgroundColor: '#d0d0d0'}}>
      {/* Header */}
      <div className="bg-gray-300 px-8 py-4 flex justify-between items-center border-b-4 border-gray-700" style={{backgroundColor: '#d0d0d0'}}>
        <div className="flex items-center gap-3">
          <div className="bg-teal-600 text-white px-3 py-1 font-bold text-xs border-2 border-gray-700 shadow-md" style={{backgroundColor: '#16a085'}}>
            CALL OF CODE
          </div>
          <span className="text-gray-800 text-xs font-mono font-bold tracking-wider">Tech Club</span>
        </div>
        <button className="text-gray-800 font-mono text-xs border-2 border-gray-700 px-3 py-1 hover:bg-gray-400 transition font-bold tracking-wider" style={{letterSpacing: '0.15em'}}>
          HOME
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6" style={{backgroundColor: '#d0d0d0'}}>
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Panel - Features */}
          <div className="bg-white border-4 border-gray-700 p-10 shadow-xl" style={{boxShadow: '6px 6px 0 rgba(0,0,0,0.4)'}}>
            <div className="flex items-start gap-4 mb-8">
              <ChevronRight className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" strokeWidth={3} style={{color: '#16a085'}} />
              <div>
                <h2 className="text-3xl font-black text-gray-900 font-mono" style={{fontWeight: 900, fontFamily: 'monospace', letterSpacing: '0.02em'}}>Access the Arena</h2>
                <p className="text-gray-700 text-xs font-mono mt-1" style={{fontSize: '11px'}}>Authenticate and engage</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-teal-600" style={{backgroundColor: '#16a085'}}></div>
                <span className="text-gray-800 font-mono text-xs" style={{fontSize: '11px'}}>Secure sessions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-teal-600" style={{backgroundColor: '#16a085'}}></div>
                <span className="text-gray-800 font-mono text-xs" style={{fontSize: '11px'}}>Weekly challenges</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-teal-600" style={{backgroundColor: '#16a085'}}></div>
                <span className="text-gray-800 font-mono text-xs" style={{fontSize: '11px'}}>Project collabs</span>
              </div>
            </div>

            <div className="w-12 h-1 bg-teal-600" style={{backgroundColor: '#16a085'}}></div>
          </div>

          {/* Right Panel - Auth Form */}
          <div className="bg-white border-4 border-gray-700 p-0 shadow-xl overflow-hidden" style={{boxShadow: '6px 6px 0 rgba(0,0,0,0.4)'}}>
            
            {/* Tab Buttons */}
            <div className="flex border-b-4 border-gray-700 bg-white">
              <button
                onClick={() => {
                  setCurrentPage('login');
                  setFormData({ email: '', password: '', username: '', confirmPassword: '' });
                }}
                className={`flex-1 px-8 py-3 font-mono font-bold text-xs transition border-r-4 border-gray-700 tracking-wider ${
                  currentPage === 'login'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: currentPage === 'login' ? '#16a085' : '#f3f3f3',
                  color: currentPage === 'login' ? 'white' : '#333',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setCurrentPage('signup');
                  setFormData({ email: '', password: '', username: '', confirmPassword: '' });
                }}
                className={`flex-1 px-8 py-3 font-mono font-bold text-xs transition tracking-wider ${
                  currentPage === 'signup'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: currentPage === 'signup' ? '#16a085' : '#f3f3f3',
                  color: currentPage === 'signup' ? 'white' : '#333',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Signup
              </button>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {/* Login Form */}
              {currentPage === 'login' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-800 text-xs font-mono font-bold mb-2 tracking-wider">EMAIL</label>
                    <div className="border-2 border-gray-500 p-0">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@domain.com"
                        className="w-full font-mono text-xs px-3 py-2 focus:outline-none text-gray-800 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-800 text-xs font-mono font-bold mb-2 tracking-wider">PASSWORD</label>
                    <div className="border-2 border-gray-500 p-0">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••"
                        className="w-full font-mono text-xs px-3 py-2 focus:outline-none text-gray-800 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <button className="text-teal-600 text-xs font-mono hover:underline" style={{color: '#16a085', fontSize: '11px'}}>
                      Forgot password?
                    </button>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-teal-600 text-white py-3 font-mono font-bold text-xs hover:opacity-90 transition border-2 border-gray-700 shadow-md tracking-wider"
                    style={{backgroundColor: '#16a085', fontSize: '12px', fontWeight: 'bold'}}
                  >
                    LOGIN →
                  </button>

                  <p className="text-center text-gray-800 text-xs font-mono" style={{fontSize: '11px'}}>
                    New here?{' '}
                    <button
                      onClick={() => setCurrentPage('signup')}
                      className="text-teal-600 font-bold hover:underline"
                      style={{color: '#16a085'}}
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              )}

              {/* Signup Form */}
              {currentPage === 'signup' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-800 text-xs font-mono font-bold mb-2 tracking-wider">USERNAME</label>
                    <div className="border-2 border-gray-500 p-0">
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="choose your handle"
                        className="w-full font-mono text-xs px-3 py-2 focus:outline-none text-gray-800 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-800 text-xs font-mono font-bold mb-2 tracking-wider">EMAIL</label>
                    <div className="border-2 border-gray-500 p-0">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@domain.com"
                        className="w-full font-mono text-xs px-3 py-2 focus:outline-none text-gray-800 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-800 text-xs font-mono font-bold mb-2 tracking-wider">PASSWORD</label>
                    <div className="border-2 border-gray-500 p-0">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••"
                        className="w-full font-mono text-xs px-3 py-2 focus:outline-none text-gray-800 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-800 text-xs font-mono font-bold mb-2 tracking-wider">CONFIRM PASSWORD</label>
                    <div className="border-2 border-gray-500 p-0">
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••"
                        className="w-full font-mono text-xs px-3 py-2 focus:outline-none text-gray-800 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-teal-600 text-white py-3 font-mono font-bold text-xs hover:opacity-90 transition border-2 border-gray-700 shadow-md tracking-wider"
                    style={{backgroundColor: '#16a085', fontSize: '12px', fontWeight: 'bold'}}
                  >
                    CREATE ACCOUNT →
                  </button>

                  <p className="text-center text-gray-800 text-xs font-mono" style={{fontSize: '11px'}}>
                    Already a member?{' '}
                    <button
                      onClick={() => setCurrentPage('login')}
                      className="text-teal-600 font-bold hover:underline"
                      style={{color: '#16a085'}}
                    >
                      Login
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-300 border-t-4 border-gray-700 px-8 py-4 text-right text-gray-700 text-xs font-mono font-bold tracking-wider" style={{backgroundColor: '#d0d0d0'}}>
        Secure by design
      </div>
    </div>
  );
}