import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner, Form, Button, Card } from 'react-bootstrap'
import { chargeCustomer } from '../actions/cardActions'
import { Link, useHistory } from "react-router-dom"
import { getSingleAddress } from '../actions/userActions'
import Message from './Message'
import '../styles/checkout.css' // 🔥 New styles

const ChargeCardComponent = ({ selectedAddressId, addressSelected, checkoutData }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const { cardData } = useSelector((state) => state.createCardReducer)
    const { success: chargeSuccessfull, error: chargeError, loading: chargingStatus } = useSelector(
        (state) => state.chargeCardReducer
    )
    const { address } = useSelector((state) => state.getSingleAddressReducer)

    useEffect(() => {
        if (selectedAddressId) {
            dispatch(getSingleAddress(selectedAddressId))
        }
    }, [dispatch, selectedAddressId])

    // Safe access to checkout data
    const items = checkoutData?.items || [];
    const totalAmount = checkoutData?.total || 0;
    const productName = items.length > 0 && items[0].product
        ? items[0].product.name
        : 'Product';
    const isCartCheckout = checkoutData?.type === 'cart';

    const onSubmit = (e) => {
        e.preventDefault()

        if (!address) {
            alert("Please select a delivery address");
            return;
        }

        const address_detail = `${address.house_no}, near ${address.landmark}, ${address.city}, 
        ${address.state}, ${address.pin_code}`

        const data = {
            email: cardData?.email || '',
            payment_method_id: cardData?.card_data?.id || '',
            amount: totalAmount,
            name: address.name,
            card_number: cardData?.card_data?.card?.last4 || '****',
            address: address_detail,
            ordered_item: isCartCheckout ? `${items.length} item(s) in cart` : productName,
            paid_status: true,
            total_price: totalAmount,
            is_delivered: false,
            delivered_at: "Not Delivered",
            // Add metadata for cart checkout
            metadata: isCartCheckout ? {
                items_count: items.length,
                product_names: items.map(item => item.product?.name || 'Unknown').join(', ')
            } : {}
        }
        dispatch(chargeCustomer(data))
    }

    if (chargeSuccessfull) {
        history.push({
            pathname: '/payment-status/',
            state: {
                detail: isCartCheckout ? {
                    name: `${items.length} item(s) in cart`,
                    price: totalAmount
                } : checkoutData?.items[0]?.product
            }
        })
        window.location.reload()
    }

    // Show error if checkout data is missing
    if (!checkoutData) {
        return (
            <Message variant="danger">
                Checkout data is missing. Please try again.
            </Message>
        );
    }

    return (
        <div className="checkout-container">
            {chargeError && <Message variant="danger">{chargeError}</Message>}

            <Card className="checkout-card">
                <Card.Body>
                    <h4 className="checkout-title">Confirm Your Payment</h4>
                    <p className="text-muted mb-3">
                        Using Card: <strong>•••• •••• •••• {cardData?.card_data?.last4 || '****'}</strong>
                    </p>

                    {/* Order Summary */}
                    <Card className="mb-3">
                        <Card.Body>
                            <h6>Order Summary</h6>
                            {items.map((item, index) => (
                                <div key={index} className="d-flex justify-content-between mb-2">
                                    <span>
                                        {item.quantity} x {item.product?.name || 'Unknown Product'}
                                    </span>
                                    <span>₹ {(item.product?.price * item.quantity || 0).toFixed(2)}</span>
                                </div>
                            ))}
                            <hr />
                            <div className="d-flex justify-content-between">
                                <strong>Total:</strong>
                                <strong>₹ {totalAmount.toFixed(2)}</strong>
                            </div>
                        </Card.Body>
                    </Card>

                    <Form onSubmit={onSubmit}>
                        <Button
                            variant="primary"
                            type="submit"
                            className="checkout-btn"
                            disabled={chargingStatus || !addressSelected}
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
                                <>Pay ₹{totalAmount.toFixed(2)}</>
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