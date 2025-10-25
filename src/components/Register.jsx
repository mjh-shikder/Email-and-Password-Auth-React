import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password, terms);

    // const length6Pattern = /^.{6,}$/;
    // const casePattertn = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]{6}$/;
    // const specialCharecter = /^(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

    // if (!length6Pattern.test(password)) {
    //   console.log('password did not match');
    //   setError('Password must be atleast 6 charecters')
    //   return;
    // }
    // else if (!casePattertn.test(password)) {
    //   setError('Password must have atleas one upper and one lower case charecter')
    //   return;
    // }
    // else if (!specialCharecter.test(password)) {
    //   setError('Password Must contain one special charecter (e.g. !@#$%^&)')
    //   return;
    // }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character (!@#$%^&*)."
      );
      return;
    }

    // reset status: success or error
    setError("");
    setSuccess(false);

    if (!terms) {
      setError('Accpet our Terms and Conditions to Register')
      return;
}

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("after creating a new user", result);
        setSuccess(true);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleTogglePasswordShow = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                />
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input"
                    placeholder="Password"
                    name="password"
                  />
                  <button
                    onClick={handleTogglePasswordShow}
                    className="btn btn-xs absolute top-2 right-6"
                  >
                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                  </button>
                </div>
                <div>
                  <label className="label">
                    <input
                      type="checkbox"
                      name="terms"
                      className="checkbox"
                    />
                    Accept Our Terms and Conditions
                  </label>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {success && (
                <p className="text-green-600">Account Created Successfully!</p>
              )}
              {error && <p className="text-red-500">{error}</p>}
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
