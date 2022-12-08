import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import date from "date-and-time";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logout, setLogout] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let hour = localStorage.getItem("hour");
    let minute = localStorage.getItem("minute");
    let second = localStorage.getItem("second");
    let year = localStorage.getItem("year");
    let month = localStorage.getItem("month");
    let date2 = localStorage.getItem("date2");
    const now = new Date();
    const date1 = new Date(year, month, date2, hour, minute, second);
    date1.setHours(date1.getHours() + 23);
    date.format(date1, "YYYY/MM/DD HH:mm:ss");
    console.log(year, month, date2, hour, minute, second, "pintu");
    const value = date.subtract(date1, now);

    console.log("total days between them " + value.toHours());
    let x = value.toHours();
    setCount(x);
    if (x > 0) {
      setLogout(true);
    } else {
      setLogout(false);
    }
  }, []);

  const handleSubmit = () => {
    console.log(email, password);
    axios
      .post("http://localhost:8080/api/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.code === 500) {
          alert("User Not Found");
        }
        if (res.data.code === 404) {
          alert("Password is wrong");
        }
        if (res.data.code === 201) {
          alert("Too many attempts");
          setLogout(true);
          console.log(res.data);

          const year = res.data.current_year;
          localStorage.setItem("year", year);
          const month = res.data.current_month;
          localStorage.setItem("month", month);
          const date2 = res.data.current_date;
          localStorage.setItem("date2", date2);
          const minute = res.data.current_minute;
          localStorage.setItem("minute", minute);
          const second = res.data.current_second;
          localStorage.setItem("second", second);
          const hour = res.data.current_hour;
          localStorage.setItem("hour", hour);
          console.log(
            year,
            month,
            date2,
            minute,
            second,
            hour,
            "when settign to localstoragee"
          );
        }
        if (res.data.code === 200) {
          // move to home
          navigate("/home");
          localStorage.setItem("TOKEN", res.data.token);
          localStorage.setItem("TOKEN", -1);
          localStorage.setItem("EMAIL", res.data.email);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {logout ? (
        <h4>You can login after hours {count}</h4>
      ) : (
        <div>
          <h1 className="center"> SIGNIN </h1>
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
              style={{
                textAlign: "center",
                display: "block",
                marginTop: "5px",
              }}
              to={"/"}
            >
              {" "}
              SIGN UP{" "}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Signin;
