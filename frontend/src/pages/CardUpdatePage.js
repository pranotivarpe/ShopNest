import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savedCardsList, updateStripeCard } from '../actions/cardActions'
import { Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap'
import { UPDATE_STRIPE_CARD_RESET } from '../constants'
import { checkTokenValidation, logout } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import { FaCreditCard, FaCity, FaGlobe, FaMapMarkerAlt, FaMailBulk } from 'react-icons/fa'

const CardUpdatePage = () => {
    let history = useHistory()
    const dispatch = useDispatch()

    // Reducers
    const { error: tokenError } = useSelector(state => state.checkTokenValidationReducer)
    const { userInfo } = useSelector(state => state.userLoginReducer)
    const { stripeCards, loading } = useSelector(state => state.savedCardsListReducer)
    const { success } = useSelector(state => state.updateStripeCardtReducer)

    // State
    const [cardNumber, setCardNumber] = useState("")
    const [name, setName] = useState("")
    const [expMonth, setExpMonth] = useState("")
    const [expYear, setExpYear] = useState("")
    const [addressCity, setAddressCity] = useState("")
    const [addressCountry, setAddressCountry] = useState("")
    const [addressState, setAddressState] = useState("")
    const [addressZip, setAddressZip] = useState("")
    const [customerId, setCustomerId] = useState("")
    const [cardId, setCardId] = useState("")

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(savedCardsList())
        }
    }, [dispatch, history, userInfo, success])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (customerId && cardId) {
            const all_card_data = {
                card_number: cardNumber,
                customer_id: customerId,
                card_id: cardId,
                exp_month: expMonth,
                exp_year: expYear,
                name_on_card: name,
                address_city: addressCity,
                address_country: addressCountry,
                address_state: addressState,
                address_zip: addressZip
            }
            dispatch(updateStripeCard(all_card_data))
        }
    }

    const setCustomerAndCardIds = (cus_Id, card_Id, c_num) => {
        setCustomerId(cus_Id)
        setCardId(card_Id)
        setCardNumber(c_num)
    }

    if (success) {
        alert("Card Successfully Updated")
        history.push("/stripe-card-details")
        dispatch({ type: UPDATE_STRIPE_CARD_RESET })
    }

    return (
        <Row className="justify-content-md-center mt-5">
            <Col xs={12} md={7}>
                <h3 className="text-center mb-4" style={{ color: "#008080", fontWeight: "bold" }}>
                    Update Card Details
                </h3>
                {loading && <div className="text-center"><Spinner animation="border" /></div>}

                {stripeCards.map((each, idx) => (
                    <Card
                        key={idx}
                        className="shadow-lg mb-4 border-0 rounded-4"
                        style={{ padding: "25px" }}
                    >
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label><FaCreditCard className="me-2 text-secondary" />Name on Card</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={each.name_on_card}
                                    placeholder="Enter full name"
                                    onChange={(e) => setName(e.target.value)}
                                    className="p-2"
                                />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Exp Month</Form.Label>
                                        <Form.Control
                                            type="text"
                                            pattern="[0-9]+"
                                            maxLength="2"
                                            defaultValue={each.exp_month}
                                            placeholder="MM"
                                            onChange={(e) => setExpMonth(e.target.value)}
                                            className="p-2"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Exp Year</Form.Label>
                                        <Form.Control
                                            type="text"
                                            pattern="[0-9]+"
                                            maxLength="4"
                                            defaultValue={each.exp_year}
                                            placeholder="YYYY"
                                            onChange={(e) => setExpYear(e.target.value)}
                                            className="p-2"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label><FaCity className="me-2 text-secondary" />City</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={each.address_city}
                                    placeholder="City"
                                    onChange={(e) => setAddressCity(e.target.value)}
                                    className="p-2"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label><FaGlobe className="me-2 text-secondary" />Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={each.address_country}
                                    placeholder="Country"
                                    onChange={(e) => setAddressCountry(e.target.value)}
                                    className="p-2"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label><FaMapMarkerAlt className="me-2 text-secondary" />State</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={each.address_state}
                                    placeholder="State"
                                    onChange={(e) => setAddressState(e.target.value)}
                                    className="p-2"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label><FaMailBulk className="me-2 text-secondary" />ZIP Code</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={each.address_zip}
                                    placeholder="ZIP"
                                    pattern="[0-9]+"
                                    maxLength="6"
                                    onChange={(e) => setAddressZip(e.target.value)}
                                    className="p-2"
                                />
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="success"
                                onClick={() => setCustomerAndCardIds(each.customer_id, each.card_id, each.card_number)}
                                className="w-100 py-2 fw-bold"
                            >
                                Save Changes
                            </Button>
                            <Button
                                variant="outline-secondary"
                                onClick={() => history.push("/stripe-card-details/")}
                                className="w-100 py-2 fw-bold mt-2"
                            >
                                Cancel
                            </Button>
                        </Form>
                    </Card>
                ))}
            </Col>
        </Row>
    )
}

export default CardUpdatePage
