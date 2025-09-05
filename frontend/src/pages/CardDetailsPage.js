import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savedCardsList } from '../actions/cardActions'
import { checkTokenValidation, logout } from '../actions/userActions'
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Message from "../components/Message"
import DeleteCardComponent from '../components/DeleteCardComponent'
import { FaCreditCard, FaTrash, FaEdit } from "react-icons/fa"

const CardDetailsPage = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [userId, setUserId] = useState(0)
    const [runCardDeleteHandler, setRunCardDeleteHandler] = useState(false)
    const [deleteCardNumber, setDeleteCardNumber] = useState("")

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    const savedCardsListReducer = useSelector(state => state.savedCardsListReducer)
    const { stripeCards, loading } = savedCardsListReducer

    const deleteSavedCardReducer = useSelector(state => state.deleteSavedCardReducer)
    const { success } = deleteSavedCardReducer

    const toggleRunCardDeleteHandler = () => {
        setRunCardDeleteHandler(!runCardDeleteHandler)
    }

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(savedCardsList())
        }
    }, [dispatch, history, userInfo])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    if (success) {
        alert("Card successfully deleted.")
        window.location.reload()
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">
                <FaCreditCard className="mr-2" /> Saved Payment Methods
            </h2>

            {loading && (
                <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant="primary" />
                    <span className="ml-2">Loading your cards...</span>
                </div>
            )}

            {/* Delete Card Modal */}
            <DeleteCardComponent
                userId={userId}
                deleteCardNumber={deleteCardNumber}
                runCardDeleteHandler={runCardDeleteHandler}
                toggleRunCardDeleteHandler={toggleRunCardDeleteHandler}
            />

            {stripeCards.length > 0 ? (
                stripeCards.map((each, idx) => (
                    <Card key={idx} className="mb-4 shadow-sm">
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <p><strong>Name on Card:</strong> {each.name_on_card || "Not Set"}</p>
                                    <p><strong>Expiry:</strong> {each.exp_month || "MM"} / {each.exp_year || "YYYY"}</p>
                                    <p><strong>Card Number:</strong> **** **** **** {each.card_number?.slice(-4)}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>City:</strong> {each.address_city || "Not Set"}</p>
                                    <p><strong>Country:</strong> {each.address_country || "Not Set"}</p>
                                    <p><strong>State:</strong> {each.address_state || "Not Set"}</p>
                                    <p><strong>Zip:</strong> {each.address_zip || "Not Set"}</p>
                                </Col>
                            </Row>

                            <div className="d-flex justify-content-end mt-3">
                                <Link to="/stripe-card-update/">
                                    <Button variant="warning" className="mr-2">
                                        <FaEdit className="mr-1" /> Update
                                    </Button>
                                </Link>
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        setDeleteCardNumber(each.card_number)
                                        setUserId(each.user)
                                        setRunCardDeleteHandler(!runCardDeleteHandler)
                                    }}
                                >
                                    <FaTrash className="mr-1" /> Delete
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <Message variant='info' className="text-center">
                    No saved card details available.
                </Message>
            )}
        </Container>
    )
}

export default CardDetailsPage
