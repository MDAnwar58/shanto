import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState({ email: "" });
  const [password, setPassword] = useState({ password: "" });

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: email.email,
        password: password.password,
      });
      setMessage(response.data.success);
      localStorage.setItem('app', response.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  const token = localStorage.getItem('app');
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className='container pt-5'>
      <div className="row justify-content-center pt-5">
        <div className="col-sm-3 pt-5">
          <div className="card">
            <h4 className="card-header text-center">User Login</h4>
            <div className="card-body">
              <form onSubmit={login}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" name='email' onChange={(e) => { setEmail({ email: e.target.value }) }} className='form-control' />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name='password' onChange={(e) => { setPassword({ password: e.target.value }) }} className='form-control' />
                </div>
                <button type='submit' className='btn btn-dark w-100 mt-2'>Login</button>
                <div className="text-center">
                  <span>If haven't an account? <Link to="/register">register</Link></span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
