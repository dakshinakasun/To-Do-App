import React, { useState } from "react";
import styles from "./Login.module.css";
import login from "../../assets/login.png";
import { Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../util/GetError";
import AuthServices from "../../services/authServices";
import Navbar from "../../components/Navbar";

function Register() {
  // State hooks for form inputs and loading status
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for programmatic navigation

  // State hook for validation errors
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  // Validation function for username and password
  const validate = () => {
    const newErrors = { username: "", password: "" };
    let isValid = true;

    // Validate username
    if (/\s/.test(username)) {
      newErrors.username = "Username can not contain spaces";
      isValid = false;
    } else if (username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
      isValid = false;
    }

    // Validate password
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Update error state
    setErrors(newErrors);
    return isValid;
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Set loading state
    setLoading(true);
    try {
      const data = {
        firstName,
        lastName,
        username,
        password,
      };
      // Call registration service
      const response = await AuthServices.registerUser(data);
      console.log(response.data);
      setLoading(false);
      message.success("You're Registered Successfully!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar active={"register"} />
      <div className={styles.login__card}>
        <img src={login} alt=".." />
        <h2>Register</h2>
        <div className={styles.input__inline__wrapper}>
          <Input
            placeholder="First Name*"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last Name*"
            style={{ marginLeft: "10px" }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={styles.input__wrapper}>
          {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
          <Input
            placeholder="Username*"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.input__wrapper}>
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          <Input.Password
            placeholder="Password*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.input__info}>
          Existing User? <Link to="/login">Login</Link>
        </div>
        <Button
          loading={loading}
          type="primary"
          size="large"
          disabled={!username || !password}
          onClick={handleSubmit}
        >
          Register
        </Button>
      </div>
    </div>
  );
}

export default Register;
