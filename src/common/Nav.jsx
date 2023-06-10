import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Nav = () => {
    const navigate = useNavigate("");
    const logout = async () => {
        localStorage.removeItem('app');
        navigate("/login");
        // <Navigate to="/login" />
    }
    
  const token = localStorage.getItem('app');
  if (!token) {
    return null;
  }

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">Navbar</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <button onClick={logout} class="nav-link active" aria-current="page">Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav
