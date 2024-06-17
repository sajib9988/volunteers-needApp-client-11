import { Link, useNavigate } from "react-router-dom";

import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Helmet } from "react-helmet";
// import axios from 'axios';
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Navbar from "../Navbar";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const photoUrl = form.get("photoUrl");
    const email = form.get("email");
    const password = form.get("password");

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (!uppercaseRegex.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }

    if (!lowercaseRegex.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      return;
    }

    try {
      const result = await createUser(email, password);
      console.log("User created:", result.user);
      await updateUserProfile(name, photoUrl);
      toast.success("Registration successful and profile updated!");
      console.log("Profile updated with name and photo URL.");

    //   const { data } = await axios.post(
    //     `${import.meta.env.VITE_API_URL}/jwt`,
    //     {
    //       email: result.user.email,
    //     },
    //     { withCredentials: true }
    //   );

    //   console.log("JWT token received:", data);
    //   toast.success("JWT token received!");
    //   // Optionally redirect the user
      navigate("/login");

    } catch (error) {
      console.error("Error creating user or updating profile:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="container w-[500px] mx-auto mt-9">
        <div className="hero-content">
          <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            {/* Registration Form */}
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo URL"
                  name="photoUrl"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              {errorMessage && (
                <div className="text-red-500 text-sm mb-2">
                  {errorMessage}
                </div>
              )}
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <ToastContainer />
            </form>
            <div className="card-footer text-center">
              <span className="font-semibold label-text-alt">
                Already have an account?
              </span>
              <Link className="font-bold" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
