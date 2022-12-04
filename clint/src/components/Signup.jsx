import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log(email, password);
    axios
      .post("http://localhost:8080/api/user/signup", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          alert("Signup success.");
          navigate("/signin");
        } else {
          alert("Error.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1 className="center"> SIGNUP </h1>

      <div className="outcard">
        Email
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          className="inputs"
          type="email"
        />{" "}
        <br /> <br />
        Password
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          className="inputs"
          type="password"
        />{" "}
        <br /> <br />
        <button onClick={handleSubmit} className="btns">
          {" "}
          SUBMIT{" "}
        </button>
        <Link
          style={{ textAlign: "center", display: "block", marginTop: "5px" }}
          to={"/signin"}
        >
          {" "}
          SIGN IN{" "}
        </Link>
      </div>
    </>
  );
}

export default Signup;
