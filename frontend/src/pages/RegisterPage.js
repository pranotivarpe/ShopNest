import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader"; // 🔥 same loader as login page

function RegisterPage({ history }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    // reducer
    const userRegisterReducer = useSelector((state) => state.userRegisterReducer);
    const { error, loading, userInfo } = userRegisterReducer;

    useEffect(() => {
        if (userInfo) {
            history.push("/"); // homepage
        }
    }, [history, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
        } else {
            dispatch(register(username, email, password));
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url('/images/login.jpg')`, // 👈 Add your register background here
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "90vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Row className="justify-content-center w-100 m-0">
                <Col xs={12} md={7} lg={6}>
                    <Card className="p-4 shadow-lg rounded-4 border-0 bg-white bg-opacity-90">
                        <Card.Body>
                            <h2 className="text-center mb-4 fw-bold text-success">Create Your Account ✨</h2>

                            {message && <Message variant="danger">{message}</Message>}
                            {error && <Message variant="danger">{error}</Message>}
                            {loading && <Loader />}

                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="name" className="mb-3">
                                    <Form.Label className="fw-semibold">Username</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="rounded-3"
                                    />
                                </Form.Group>

                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label className="fw-semibold">Email Address</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="rounded-3"
                                    />
                                </Form.Group>

                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Label className="fw-semibold">Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="rounded-3"
                                    />
                                </Form.Group>

                                <Form.Group controlId="passwordConfirm" className="mb-4">
                                    <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="rounded-3"
                                    />
                                </Form.Group>

                                <div className="d-grid">
                                    <Button type="submit" variant="success" className="rounded-3 fw-semibold">
                                        Sign Up
                                    </Button>
                                </div>
                            </Form>

                            <Row className="py-3 text-center">
                                <Col>
                                    Already have an account?{" "}
                                    <Link to="/login" className="fw-semibold">
                                        Login
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

export default RegisterPage;
