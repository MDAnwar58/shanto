import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate("");
    const [message, setMessage] = useState("");
    const [name, setName] = useState({ name: "" });
    const [email, setEmail] = useState({ email: "" });
    const [password, setPassword] = useState({ password: "" });

    const registration = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/register', {
                name: name.name,
                email: email.email,
                password: password.password,
            });
            navigate("/login");
        } catch (error) {
            setMessage(error.response.data.message);
        }
    }


    return (
        <div className='container pt-5'>
            <div className="row justify-content-center pt-5">
                <div className="col-sm-3 pt-5">
                    <div className="card">
                        <h4 className="card-header text-center">User Registration</h4>
                        <div className="card-body">
                            <form onSubmit={registration}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name='name' onChange={(e) => { setName({ name: e.target.value }) }} className='form-control' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name='email' onChange={(e) => { setEmail({ email: e.target.value }) }} className='form-control' />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name='password' onChange={(e) => { setPassword({ password: e.target.value }) }} className='form-control' />
                                </div>
                                <button type='submit' className='btn btn-dark w-100 mt-2'>Register</button>
                                <div className="text-center">
                                    <span>If have an account? <Link to="/login">login</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
