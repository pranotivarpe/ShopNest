import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Form, Button, Card } from 'react-bootstrap'
import { chargeCustomer } from '../actions/cardActions'
import { Link, useHistory } from "react-router-dom"
import { getSingleAddress } from '../actions/userActions'
import Message from './Message'
import '../styles/checkout.css' // 🔥 New styles

const ChargeCardComponent = ({ product, match, selectedAddressId }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { cardData } = useSelector((state) => state.createCardReducer)
    const { success: chargeSuccessfull, error: chargeError, loading: chargingStatus } = useSelector(
        (state) => state.chargeCardReducer
    )
    const { address } = useSelector((state) => state.getSingleAddressReducer)

    useEffect(() => {
        dispatch(getSingleAddress(selectedAddressId))
    }, [dispatch, match, selectedAddressId])

    const onSubmit = (e) => {
        e.preventDefault()
        const address_detail = `${address.house_no}, near ${address.landmark}, ${address.city}, 
        ${address.state}, ${address.pin_code}`
        const data = {
            email: cardData.email,
            payment_method_id: cardData.card_data.id,
            amount: product.price,
            name: address.name,
            card_number: cardData.card_data.card.last4,
            address: address_detail,
            ordered_item: product.name,
            paid_status: true,
            total_price: product.price,
            is_delivered: false,
            delivered_at: "Not Delivered",
        }
        dispatch(chargeCustomer(data))
    }

    if (chargeSuccessfull) {
        history.push({ pathname: '/payment-status/', state: { detail: product } })
        window.location.reload()
    }

    return (
        <div className="checkout-container">
            {chargeError && <Message variant="danger">{chargeError}</Message>}

            <Card className="checkout-card">
                <Card.Body>
                    <h4 className="checkout-title">Confirm Your Payment</h4>
                    <p className="text-muted mb-3">
                        Using Card: <strong>•••• •••• •••• {cardData.card_data.last4}</strong>
                    </p>

                    <Form onSubmit={onSubmit}>
                        <Button
                            variant="primary"
                            type="submit"
                            className="checkout-btn"
                            disabled={chargingStatus}
                        >
                            {chargingStatus ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    /> Processing...
                                </>
                            ) : (
                                <>Pay ₹{product.price}</>
                            )}
                        </Button>
                    </Form>

                    {address && (
                        <Card className="address-card mt-4">
                            <Card.Body>
                                <h6 className="text-info mb-3">📦 Delivery Address</h6>
                                <p><b>Name:</b> {address.name}</p>
                                <p><b>Phone:</b> {address.phone_number}</p>
                                <p><b>House No:</b> {address.house_no}</p>
                                <p><b>Landmark:</b> {address.landmark}</p>
                                <p><b>City:</b> {address.city}</p>
                                <p><b>State:</b> {address.state}</p>
                                <p><b>Pin Code:</b> {address.pin_code}</p>
                            </Card.Body>
                        </Card>
                    )}

                    <div className="mt-3 text-center">
                        <Link to="#" onClick={() => window.location.reload()}>
                            Select a different card
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ChargeCardComponent
