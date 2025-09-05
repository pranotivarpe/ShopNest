import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Container, Image, Card, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../actions/productActions'
import CreateCardComponent from '../components/CreateCardComponent'
import ChargeCardComponent from '../components/ChargeCardComponent'
import Message from '../components/Message'
import { savedCardsList } from '../actions/cardActions'
import UserAddressComponent from '../components/UserAddressComponent'
import { checkTokenValidation, logout } from '../actions/userActions'
import { CHARGE_CARD_RESET } from '../constants/index'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const CheckoutPage = ({ match }) => {
    let history = useHistory()
    const dispatch = useDispatch()

    const [addressSelected, setAddressSelected] = useState(false)
    const [selectedAddressId, setSelectedAddressId] = useState(0)

    const handleAddressId = (id) => {
        if (id) setAddressSelected(true)
        setSelectedAddressId(id)
    }

    // reducers
    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    const productDetailsReducer = useSelector(state => state.productDetailsReducer)
    const { loading, error, product } = productDetailsReducer

    const createCardReducer = useSelector(state => state.createCardReducer)
    const { error: cardCreationError, success, loading: cardCreationLoading } = createCardReducer

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const savedCardsListReducer = useSelector(state => state.savedCardsListReducer)
    const { stripeCards } = savedCardsListReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(getProductDetails(match.params.id))
            dispatch(savedCardsList())
            dispatch({ type: CHARGE_CARD_RESET })
        }
    }, [dispatch, match, history, success, userInfo])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    return (
        <Container className="py-4">
            {cardCreationError && <Message variant='danger'>{cardCreationError}</Message>}

            {loading && (
                <div className="d-flex justify-content-center align-items-center my-5">
                    <Spinner animation="border" />
                    <h5 className="ml-3">Fetching Checkout Info...</h5>
                </div>
            )}

            {!loading && cardCreationLoading && (
                <div className="d-flex justify-content-center align-items-center my-5">
                    <Spinner animation="border" />
                    <h5 className="ml-3">Validating Card Details...</h5>
                </div>
            )}

            {error && <Message variant='danger'>{error}</Message>}

            {!loading && !error && (
                <Row>
                    {/* Checkout Summary */}
                    <Col md={6} className="mb-4">
                        <h3 className="mb-3">Checkout Summary</h3>
                        <Card className="shadow-sm mb-4">
                            <Card.Body>
                                <Row className="align-items-center">
                                    <Col xs={5}>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fluid
                                            rounded
                                            className="border"
                                        />
                                    </Col>
                                    <Col xs={7}>
                                        <h5 className="text-capitalize">{product.name}</h5>
                                        <span className="text-success h6">₹ {product.price}</span>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        <Card className="shadow-sm">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h4>Billing Address</h4>
                                    <Link to="/all-addresses/">Edit/Add</Link>
                                </div>
                                <UserAddressComponent handleAddressId={handleAddressId} />
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Payments Section */}
                    <Col md={6}>
                        <h3 className="mb-3">Payments Section</h3>
                        <Card className="shadow-sm">
                            <Card.Body>
                                {success ? (
                                    <ChargeCardComponent
                                        selectedAddressId={selectedAddressId}
                                        addressSelected={addressSelected}
                                        product={product}
                                    />
                                ) : (
                                    <Elements stripe={stripePromise}>
                                        <CreateCardComponent
                                            addressSelected={addressSelected}
                                            stripeCards={stripeCards}
                                        />
                                    </Elements>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default CheckoutPage
