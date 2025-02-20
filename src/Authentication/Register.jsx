import { useContext } from "react";

import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const { registerUser, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.pass.value;
    const name = e.target.name.value;
    const pic = e.target.pic.value;

    // Validate password strength
    if (!passwordRegex.test(pass)) {
      toast.error('Password must contain 6+ characters, uppercase, lowercase, number, and special character.', {
        position: "top-center",
      });
      return;
    }

    // Register user
    registerUser(email, pass)
      .then((data) => {
        setUser(data.user);
        // Update user profile
        updateProfile(data.user, { displayName: name, photoURL: pic })
          .then(() => {
            navigate('/');  // Navigate after successful registration
            toast.success("Registration successful! 🎉", { position: "top-center" });
          })
          .catch((error) => {
            console.log(error.message);
            toast.error('Profile update failed! ', { position: "top-center" });
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error('Registration failed! Please try again.', { position: "top-center" });
      });
  };

  return (
    <div className="mx-auto mt-16 flex flex-col justify-center items-center">
      {/* Card Container with Gradient Overlay */}
      <div
        className="w-1/2 max-w-sm relative bg-base-100 rounded-lg shadow-2xl overflow-hidden"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/fGTwxL1/best-simple-easy-chicken-dum-biryani-500x500.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70"></div>

        {/* Content */}
        <div className="relative p-6 z-10">
          <h1 className="text-5xl text-red-600 text-center mt-4">Register Now</h1>
          <form className="w-full card-body bg-transparent p-6" onSubmit={handleRegister}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Name</span>
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
                <span className="label-text text-white">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                name="pic"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
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
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                name="pass"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-white">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Register;