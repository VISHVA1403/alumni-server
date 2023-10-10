import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrationForm = () => {
    return (
        <div className="container">
            <h2>Registration Form</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="Enter First Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Enter Last Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input type="tel" className="form-control" id="mobileNumber" placeholder="Enter Mobile Number" />
                </div>
                <div className="form-group">
                    <label htmlFor="registerNumber">Register Number</label>
                    <input type="text" className="form-control" id="registerNumber" placeholder="Enter Register Number" />
                </div>
                <div className="form-group">
                    <label htmlFor="bloodGroup">Blood Group</label>
                    <input type="text" className="form-control" id="bloodGroup" placeholder="Enter Blood Group" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default RegistrationForm;
