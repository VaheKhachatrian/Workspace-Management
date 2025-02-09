import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Card, Typography } from "antd";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../services/apiSlice";
import "./auth.css";

const { Title } = Typography;

const Register = ({ switchToLogin }) => {
  const [registered, setRegistered] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();
  
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async (data) => {
    try {
      await register(data).unwrap(); 
      setRegistered(true);
      switchToLogin();
    } catch (err) {
      alert(err.message || "Registration failed");
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="">
      <Card className="">
        <div className="">
          <div style={{ width: "100%" }}>
            <Title level={2}>Sign Up</Title>
            <form onSubmit={handleSubmit(handleRegister)}>
              <div className="form-item">
              <label style={{display:"flex", gap: "3px"}} htmlFor="email"><p>Full Name</p> <p style={{color: "red"}}>*</p></label>
                <Controller
                  name="fullName"
                  control={control}
                  rules={{
                    required: "Please enter your full name",
                    minLength: {
                      value: 3,
                      message: "Full name must be at least 3 characters long"
                    }
                  }}
                  render={({ field }) => (
                    <Input
                      id="fullName"
                      placeholder="Full Name"
                      className="input"
                      {...field}
                    />
                  )}
                />
                {errors.fullName && <div className="login-error">{errors.fullName.message}</div>}
              </div>

              <div className="form-item">
                <label style={{display:"flex", gap: "3px"}} htmlFor="email"><p>Email</p> <p style={{color: "red"}}>*</p></label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Please enter your email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) => (
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      className="input"
                      {...field}
                    />
                  )}
                />
                {errors.email && <div className="login-error">{errors.email.message}</div>}
              </div>

              <div className="form-item">
                <label style={{display:"flex", gap: "3px"}} htmlFor="email"><p>Password</p> <p style={{color: "red"}}>*</p></label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Please enter your password",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long"
                    },
                    pattern: {
                      value: /[A-Z]/,
                      message: "Password must contain at least one uppercase letter"
                    }
                  }}
                  render={({ field }) => (
                    <Input.Password
                      id="password"
                      placeholder="Password"
                      className="input"
                      {...field}
                    />
                  )}
                />
                {errors.password && <div className="login-error">{errors.password.message}</div>}
              </div>

              <div className="form-item">
                {registered ? (
                  <Link to={"/login"}>
                    <div>Registration successful, redirecting to login...</div>
                  </Link>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={isLoading}
                  >
                    Sign Up
                  </Button>
                )}
              </div>
            </form>

            <div style={{ marginTop: "16px" }}>
              Already have an account? <Link onClick={() => { switchToLogin(); }}>Login</Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
