import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="flex grid md:grid-cols-5 grid-cols-1 grid-cols-5 h-screen">
      <div className="md:col-span-3 col-span-0 bg-center bg-cover bg-[url('/src/images/octagon.gif')]">
      </div>
      <div className="md:col-span-2 col-span-1 col-span-2 flex justify-center content-center shadow-2xl ">
        <div className="login">
          <div className="login__container">
            <article class="prose mb-4 h-32 text-4xl">
              <h1 className="">
                Sign <span className="text-primary">in</span>
              </h1>
            </article>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <input
              type="password"
              className="input input-bordered w-full max-w-xs mt-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              className="btn btn-secondary mt-6 mb-2"
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Login
            </button>
            <div className="divider ">OR</div>
            <button className="btn btn-primary mt-1" onClick={signInWithGoogle}>
              Login with Google
              <svg
                class="w-4 h-4 mr-2"
                xmlns="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK5q0FP74VV9wbfwP378_7kj7iDomHuKrxkXsxDdUT28V9dlVMNUe-EMzaLwaFhneeuZI&usqp=CAU"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
            </button>
            <div>
              <Link to="/reset">Forgot Password</Link>
            </div>
            <div>
              Don't have an account? <Link to="/register">Register</Link> now.
            </div>
          </div>
        </div>
      </div>
    </div>

    //
  );
}
export default Login;
