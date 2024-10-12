import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./logout.css";

export default function Login(props) {
  const [credentials, setcredential] = useState({ email: "",aadharNumber:"", password: "" });
  const navigate = useNavigate();
  const [content, setcontent] = useState("");
  const password = document.querySelector("#exampleInputPassword1");

  const handleonClick = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        aadharNumber: credentials.aadharNumber,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json)
    if (json.success === true) {
      localStorage.setItem("token", json.token);
      navigate("/home");
      props.showalert();
    } else {
      props.showalert();
      if(json.success1===false){
        setcontent(json.error);
      }
      password.style.border = "1px solid red";
      setcontent(json.error);
    }
  };
  const onchange = async(e) => {
    //setcredential({ ...credentials, [e.target.name]: e.target.value });
    await setcredential({ ...credentials, [e.target.name]: e.target.value });
    //password.style.border = "";
    setcontent("");
  };
  return (
    <div className="container1" style={{height:"600px",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",zIndex:"10"}}>
      <div
        className="container"
        style={{
          maxWidth: "500px",
          minHeight: "370px",
          border: "2px solid #EAEAEA",
          boxSizing: "border-box",
          paddingTop: "20px",
          borderRadius: "12px",
          boxShadow: "0px 10px 25px #000",
          fontWeight:"700",
          background:"linear-gradient(#E2EAF4,#E2EAF4,white)",
          opacity:"0.9",
          backgroundImage:"url('Screenshot 2024-10-12 160745.png')",
          backgroundSize:"cover"
        }}
      >
        <h3 style={{fontFamily:"arial",fontSmooth:"2px",fontWeight:"700",marginBottom:"20px"}}>Login into a account</h3>
        <form onSubmit={handleonClick} style={{ columnGap: "20px" }}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onchange}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="exampleInputaadharNumber1" className="form-label">
              AadharNumber
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputaadharNumber1"
              name="aadharNumber"
              value={credentials.aadharNumber}
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
            <p style={{ color: "red" }}>{content}</p>
          </div>
          <button
            type="submit"
            className="same-btn1"
            style={{ marginTop: "0px", marginBottom: "18px" }}
          >
            Login
          </button>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <p onClick={props.handleonClick2}> Don't have an account..SignUp</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
