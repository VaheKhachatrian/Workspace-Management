import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/apiSlice";
import "./auth.css";

const { Title } = Typography;

const Login = ({ switchToRegister }) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;

      const response = await login({ email, password }).unwrap();

      localStorage.setItem("user", JSON.stringify(response));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("accessToken", response.accessToken);
      navigate("/");
    } catch (err) {
      setLoginError(err.message || "Login failed");
      console.error("Login failed:", err);
    }
  };

  return (
    <div>
      <Card>
        <div>
          <div className="">
            <Title level={2}>Login</Title>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-item">
                <label style={{display:"flex", gap: "3px"}} htmlFor="email"><p>Email</p> <p style={{color: "red"}}>*</p></label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Please input your email!" }}
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

              <div className="form-item" style={{display: "flex", flexDirection: "column", gap: "0px"}}>
                <label style={{display:"flex", gap: "3px"}} htmlFor="email"><p>Password</p> <p style={{color: "red"}}>*</p></label>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Please input your password!" }}
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

              {loginError && <div className="login-error">{loginError}</div>}

              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={isLoading}
                >
                  Login
                </Button>
              </div>
            </form>

            <div style={{ marginTop: "16px" }}>
              Don't have an account? <Link onClick={() => switchToRegister()}>Sign Up</Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
