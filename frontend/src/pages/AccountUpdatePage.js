import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails, userUpdateDetails, checkTokenValidation, logout } from '../actions/userActions'
import { UPDATE_USER_DETAILS_RESET } from '../constants'
import Message from '../components/Message'

function AccountUpdatePage() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    // reducers
    const { error: tokenError } = useSelector(state => state.checkTokenValidationReducer)
    const { userInfo } = useSelector(state => state.userLoginReducer)
    const { user: userAccDetails, loading } = useSelector(state => state.userDetailsReducer)
    const { success, error: updateError } = useSelector(state => state.userDetailsUpdateReducer)

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(userDetails(userInfo.id))
        }
    }, [dispatch, history, userInfo])

    if (userInfo && tokenError === "Request failed with status code 401") {
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const updatedUsername = username || userAccDetails.username
        const updatedEmail = email || userAccDetails.email

        if (password !== confirmPassword) {
            setMessage("Passwords do not match!")
        } else {
            dispatch(userUpdateDetails({
                username: updatedUsername,
                email: updatedEmail,
                password
            }))
        }
    }

    // Reset update state after success
    useEffect(() => {
        if (success) {
            setMessage("Account updated successfully!")
            dispatch({ type: UPDATE_USER_DETAILS_RESET })
            dispatch(userDetails(userInfo.id))
        }
    }, [success, dispatch, userInfo])

    return (
        <div>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1>Update Account</h1>

                    {/* Feedback messages */}
                    {message && <Message variant={success ? 'success' : 'danger'}>{message}</Message>}
                    {updateError && <Message variant='danger'>{updateError}</Message>}
                    {loading && <Spinner animation="border" />}

                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='username'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                defaultValue={userAccDetails?.username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                defaultValue={userAccDetails?.email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm new password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button type="submit" variant='success' className="btn-sm">Save Changes</Button>
                        <Link to="/account" className="btn btn-primary btn-sm ml-2">
                            Cancel
                        </Link>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default AccountUpdatePage
