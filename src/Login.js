import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { email, password } = state;

      // Validate the input
      if (!email || !password) {
        // Display an error message or handle the validation error
        return;
      }

      // Send a request to the backend server to authenticate the user
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Handle the response from the server
      if (response.ok) {
        // Authentication successful
        const { token } = await response.json();

        // Store the token in local storage or a browser cookie
        localStorage.setItem('token', token);

        // Redirect the user to the desired page or update the UI accordingly
        navigate('/dashboard');
      } else {
        // Authentication failed
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        // Display an error message or handle the authentication failure
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Login error:', error);
    }
  };

  const loginContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#0B1B3D', // Set the background color (RGB: 255, 159, 3)
  };

  const loginFormStyle = {
    backgroundColor: '#f2f2f2',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '350px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#0B1B3D',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background-color: rgb(255, 159, 3);
        }
      `}</style>
      <div style={loginContainerStyle}>
        <div style={loginFormStyle}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h1>
          {/* Your login form inputs and submit button */}
          <form>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                placeholder="Email"
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="password"
                placeholder="Password"
                value={state.password}
                onChange={(e) => setState({ ...state, password: e.target.value })}
                style={inputStyle}
              />
            </div>
            <button type="button" onClick={handleLogin} style={buttonStyle}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;