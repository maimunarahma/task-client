import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Firebase/Firebase.init";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const { loginUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.pass.value;

    loginUser(email, pass)
      .then((res) => {
        setLoading(false);
        
                    navigate('/');  // Navigate after successful registration
                    toast.success("Registration successful! 🎉", { position: "top-center" });
                  
        console.log(res);
        const user = { email: email };
    
  });}
  const provider = new GoogleAuthProvider();
  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Google Sign-In Success:", result.user);
        toast.success("Logged in with Google! 🎉", {
          position: "top-center",
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        toast.error("Google login failed! ", {
          position: "top-center",
        });
        navigate("/");
      });
  }
  
  return (
    <div className="bg-gray-100 flex justify-between items-center h-screen bg-cover bg-[url('https://i.ibb.co/svqbXKm/elegant-black-plate-gourmet-food-arrangement-showcasing-artistic-minimalist-food-styling-dark-backgr.webp')]">
      <div className="card w-full max-w-sm bg-white p-8 rounded-lg shadow-2xl">
        <h1 className="text-5xl font-bold text-red-600 text-center mb-6">Login</h1>
        <form onSubmit={handleLogin}>
            <ToastContainer/>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email:</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password:</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="pass"
              className="input input-bordered"
              required
            />
            <label className="label">
              <Link to="#" className="label-text-alt link link-hover">
                Forgot password?
              </Link>
            </label>
          </div>

          <div className="form-control mb-6">
            <button className="btn btn-primary w-full">Login</button>
          </div>

          <div className="text-center">
            <h2>
              New to the website?{" "}
              <Link to="/register">
                <span className="font-bold text-blue-500">Register</span>
              </Link>
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center">
          <h1>OR</h1>
          <button onClick={handleGoogleSignUp} className="btn"><FcGoogle /> Login With Google</button>
        </div>
        </form>
      </div>

      <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full">
        {/* <img
          className=" p-8 object-cover"
          src="https://i.ibb.co/svqbXKm/elegant-black-plate-gourmet-food-arrangement-showcasing-artistic-minimalist-food-styling-dark-backgr.webp"
          alt="Food"
        /> */}
      </div>
     
    </div>
  );
};

export default Login;