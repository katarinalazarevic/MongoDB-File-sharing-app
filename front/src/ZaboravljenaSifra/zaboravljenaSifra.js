//import "./login.css";
import { useRef, useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import "./zaboravljenaSifra.css";

import "../api/axios";

const ZaboravljenaSifra = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleRegisterClick = () => {
    navigate("/Register");
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  const LoginHandler = async (event) => {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    setEmail(emailValue);
    setPassword(passwordValue);

    try {
      const response = await axios.put(
        "http://127.0.0.1:5000/updateKorisnik",
        {
          email: emailValue,
          nova_sifra: passwordValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.status === 201) {
        if (response.data.message === "SUCCESS") {
          console.log("Poruka o uspešnoj prijavi:", response.data.message);
         

          return navigate("/");
        } else {
          console.log(
            "Neuspešna prijava! Status kod 200, ali prijava neuspešna."
          );
          window.confirm("Neuspešna prijava!");
        }
      } else {
        console.log("Neuspešna prijava! Status kod nije 200.");
        window.confirm("Neuspešna prijava!");
      }
    } catch (error) {
      console.error("Došlo je do greške prilikom prijave:", error);
      window.confirm("Neuspešna prijava!");
    }
  };

  const stampajVrednosti = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div>
      <div id="algn1">
        <div id="container">
          <p className="head">Change password </p>
          <form action="/" className="input-container">
            <input
              type="email"
              placeholder="Enter email"
              className="inpt"
              value={email}
              ref={emailRef}
              onChange={handleEmailChange}
              required
            />
            <input
              type="password"
              placeholder="Enter new password"
              className="inpt"
              value={password}
              ref={passwordRef}
              onChange={handlePasswordChange}
              required
            />
            <div className="rem-forgot">
              <div className="rem">
              
                
              </div>
             
            </div>
            <button type="submit" className="btn" onClick={LoginHandler}>
              Change it 
            </button>
          </form>
          <p className="footer" style={{marginBottom:'0px'}}>
            Don't have account?{" "}
            <a href="#" onClick={handleLoginClick}>
              {" "}
              Login
            </a>
          </p>

          <p className="footer" style={{marginTop:'0px'}}>
            Don't have account?{" "}
            <a href="#" onClick={handleRegisterClick}>
              {" "}
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZaboravljenaSifra;