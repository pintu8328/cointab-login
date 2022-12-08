import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import date from "date-and-time";

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
          localStorage.removeItem("timeout");
          navigate("/signin");
        } else {
          alert("Error.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const now = new Date();
  // date.format(now, 'YYYY/MM/DD HH:mm:ss')
  console.log(now, "ssss");
  now.setHours(now.getHours() + 24);
  console.log(now, "xxxx");

  // Creating object of given date and time
  // const date1 = new Date(2022, 2, 12);
  const date1 = new Date(2022, 11, 8, 15, 15, 23);
  date.format(date1, "YYYY/MM/DD HH:mm:ss");
  console.log(date1);

  // Subtracting the both dates
  // by using date.subtract() method
  const value = date.subtract(now, date1);

  // Display the result
  console.log("total days between them " + value.toHours());

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
