import React, { useState } from 'react'
import { User } from '../Utils/Models'
import { USERS } from '../Utils/Data'
import { Utils } from '../Utils/Utils'

function Home(props) {

    const [user, setUser] = useState(new User())

    const handleLoginDataChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        let userCopy = { ...user }
        userCopy[name] = value
        setUser(userCopy)
    }

    const login = (e) => {
        e.preventDefault();
        if (USERS.findIndex(item => item.email === user.email && item.password === user.password) >= 0) {
            sessionStorage.setItem("loggedIn", true);
            window.location = "dashboard";
        }
        else {
            new Utils().showErrorMessage("Invalid Username or Password.");
        }
    }

    return (
        <div className="home-wrapper">
            <div className="overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-6 login-container">
                            <div className="login-content">
                                <h4 className="center-content">Welcome to Airport Inventory</h4>
                                <form onSubmit={login}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email*:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="E.g. jhon@gmail.com"
                                            value={user.email}
                                            onChange={handleLoginDataChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password*:</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="password" 
                                            name="password" 
                                            placeholder="Enter your password" 
                                            value={user.password} 
                                            onChange={handleLoginDataChange} required />
                                    </div>
                                    <div className="right-content">
                                        <button type="submit" className="btn btn-primary">
                                            Login to Continue <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Home
