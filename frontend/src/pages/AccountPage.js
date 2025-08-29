import React, { useEffect } from 'react'
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userDetails, logout, checkTokenValidation } from '../actions/userActions'
import Message from '../components/Message'

function AccountPage() {
    let history = useHistory()
    const dispatch = useDispatch()

    // check token validation reducer
    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    // login reducer
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    // user details reducer
    const userDetailsReducer = useSelector(state => state.userDetailsReducer)
    const { user: userAccDetails, loading } = userDetailsReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            try {
                dispatch(checkTokenValidation())
                dispatch(userDetails(userInfo.id))
            } catch (error) {
                history.push("/")
            }
        }
    }, [history, userInfo, dispatch])

    // logout
    const logoutHandler = () => {
        dispatch(logout())
    }

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    return (
        <Container className="d-flex justify-content-center mt-5">
            <Col xs={12} md={8} lg={6}>
                <Card className="shadow-lg border-0 rounded-3">
                    <Card.Body className="p-4">
                        <h2 className="text-center mb-4">My Account</h2>

                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <Spinner animation="border" />
                                <span className="ml-2">Getting User Information...</span>
                            </div>
                        ) : userAccDetails ? (
                            <>
                                <Row className="mb-3">
                                    <Col xs={4} className="fw-bold text-muted">Name:</Col>
                                    <Col>{userAccDetails.username}</Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col xs={4} className="fw-bold text-muted">Email:</Col>
                                    <Col>{userAccDetails.email}</Col>
                                </Row>

                                <Row className="mb-3">
                                    <Col xs={4} className="fw-bold text-muted">Admin:</Col>
                                    <Col>{userAccDetails.admin ? "✅ Yes" : "❌ No"}</Col>
                                </Row>

                                <div className="d-flex justify-content-between mt-4">
                                    <Link to={`/account/update`}>
                                        <Button variant="warning" className="px-4">Update</Button>
                                    </Link>

                                    <Link to={`/account/delete/`}>
                                        <Button variant="danger" className="px-4">Delete</Button>
                                    </Link>

                                    <Button variant="secondary" onClick={logoutHandler} className="px-4">
                                        Logout
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <Message variant="danger">
                                Something went wrong, go back to{" "}
                                <Link onClick={logoutHandler} to={`/login`}>Login</Link> page.
                            </Message>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    )
}

export default AccountPage
