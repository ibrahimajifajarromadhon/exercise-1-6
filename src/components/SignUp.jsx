import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import GoogleLogin from "./GoogleLogin";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [validation, setValidation] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();

    const payload = {
      name: username,
      email: email,
      password: password,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    };

    try {
      const response = await axios(config);
      console.log(response.data);
      localStorage.setItem("token", response.data.data.token);
      navigate("/");
    } catch (error) {
      console.log(error.response);
      setValidation(error.response.data);
    }
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold">HALAMAN SIGN UP</h4>
              <hr />
              {validation.message && (
                <div className="alert alert-danger">{validation.message}</div>
              )}
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label">NAMA</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan nama"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">ALAMAT EMAIL</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Alamat Email"
                  />
                </div>
                {validation.email && (
                  <div className="alert alert-danger">
                    {validation.email[0]}
                  </div>
                )}
                <div className="mb-3">
                  <label className="form-label">PASSWORD</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan Password"
                  />
                </div>
                {validation.password && (
                  <div className="alert alert-danger">
                    {validation.password[0]}
                  </div>
                )}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    REGISTER
                  </button>
                </div>
                <Row>
                <Col>
                  <h4 className="text-center">Or</h4>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <GoogleLogin buttonText="Register with Google 🚀" />
                </Col>
              </Row>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
