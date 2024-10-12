import React from "react";

export default function End(props) {
  /*const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    props.showalert();
  };*/
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop:"20%",
        rowGap:"20px"
      }}
    >
      <div>
        <h2>Thank you</h2>
      </div>
      <div>
        <h3>Your Vote is added</h3>
      </div>
    </div>
  );
}
