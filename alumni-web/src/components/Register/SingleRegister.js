import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SingleRegister = () => {
  var [ usernameError , setUsernameError ] = useState('')
  var [ emailError , setEmailError ] = useState('')

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username:"",
    email: "",
    password: "kit@123",
    password2: "kit@123"
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError('')
    setUsernameError('')
    try {
      const response = await fetch("http://localhost:8000/alumni/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type to JSON
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Clear form data
        // const data = await response.json();
        alert("Registration Success!")

        setFormData({
          first_name: "",
          last_name: "",
          username:"",
          email: "",
          password: "kit@123",
          password2: "kit@123"
        });
      } else {
        const data = await response.json();
        console.log(data)
        if ('usernam' in data){
          setUsernameError(data.username[0]);
        }
        else if ('email' in data){
          setEmailError(data.email[0])
        }
        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">
                    First Name:
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="tel"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <p className="text-danger">{usernameError}</p>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <p className="text-danger">{emailError}</p>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleRegister;
