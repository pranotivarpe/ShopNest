import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { login } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

function LoginPage({ history, location }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userLoginReducer = useSelector((state) => state.userLoginReducer);
    const { error, loading, userInfo } = userLoginReducer;

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
    };

    return (
        <div
            style={{
                backgroundImage: `url('/images/login.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "90vh",
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
            }}
        >
            <Row className="justify-content-center w-100 m-0">
                <Col xs={12} md={6} lg={5}>
                    <Card className="p-4 shadow-lg rounded-4 border-0 bg-white bg-opacity-90">
                        <Card.Body>
                            <h2 className="text-center mb-4 fw-bold text-primary">Welcome Back 👋</h2>

                            {loading && <Loader />}
                            {error && <Message variant="danger">{error}</Message>}

                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="username" className="mb-3">
                                    <Form.Label className="fw-semibold">Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        autoComplete="username"
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="rounded-3"
                                    />
                                </Form.Group>

                                <Form.Group controlId="password" className="mb-4">
                                    <Form.Label className="fw-semibold">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="rounded-3"
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button type="submit" variant="primary" className="rounded-3 fw-semibold">
                                        Sign In
                                    </Button>
                                </div>
                            </Form>

                            <Row className="py-3 text-center">
                                <Col>
                                    Don’t have an account?{" "}
                                    <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} className="fw-semibold">
                                        Register
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default LoginPage;
