import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Image, Spinner, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import Message from '../components/Message';
import { getCart, removeFromCart, updateCartItem } from '../actions/cartActions';
import { CART_REMOVE_RESET, CART_UPDATE_RESET } from '../constants';

function CartPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const userLoginReducer = useSelector((state) => state.userLoginReducer);
    const { userInfo } = userLoginReducer;

    const cartReducer = useSelector((state) => state.cartReducer);
    const { loading, error, cart } = cartReducer;

    const cartRemoveReducer = useSelector((state) => state.cartRemoveReducer);
    const { loading: removeLoading, error: removeError, success: removeSuccess } = cartRemoveReducer;

    const cartUpdateReducer = useSelector((state) => state.cartUpdateReducer);
    const { loading: updateLoading, error: updateError, success: updateSuccess } = cartUpdateReducer;

    // Local state for remove confirmation modal
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [removeProductId, setRemoveProductId] = useState(null);

    // cart items with fallback
    const items = cart?.items || [];
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = items.reduce((acc, item) => acc + parseFloat(item.product.price || 0) * item.quantity, 0);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            dispatch(getCart());
        }
    }, [dispatch, userInfo, history]);

    useEffect(() => {
        if (removeSuccess) {
            dispatch({ type: CART_REMOVE_RESET });
        }
    }, [removeSuccess, dispatch]);

    useEffect(() => {
        if (updateSuccess) {
            dispatch({ type: CART_UPDATE_RESET });
        }
    }, [updateSuccess, dispatch]);

    const handleRemoveFromCart = (productId) => {
        setRemoveProductId(productId);
        setShowRemoveModal(true);
    };

    const confirmRemove = () => {
        if (removeProductId) {
            dispatch(removeFromCart(removeProductId));
        }
        setShowRemoveModal(false);
        setRemoveProductId(null);
    };

    const cancelRemove = () => {
        setShowRemoveModal(false);
        setRemoveProductId(null);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity > 0) {
            dispatch(updateCartItem(productId, newQuantity));
        } else if (newQuantity === 0) {
            // Remove item if quantity is zero
            handleRemoveFromCart(productId);
        }
    };

    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = '/images/no_preview_image.png'; // fallback image path
    };

    return (
        <Container className="py-4">
            <h2 className="mb-4">Shopping Cart</h2>

            {(loading || removeLoading || updateLoading) && (
                <div className="d-flex justify-content-center align-items-center my-5">
                    <Spinner animation="border" />
                    <h5 className="ml-3">Loading cart...</h5>
                </div>
            )}

            {(error || removeError || updateError) && (
                <Message variant="danger">
                    {error || removeError || updateError}
                </Message>
            )}

            {!loading && !error && (
                <>
                    {totalItems === 0 ? (
                        <div className="text-center py-5">
                            <h5>Your cart is empty 🛒</h5>
                            <Link to="/">
                                <Button variant="primary" className="mt-3">
                                    Browse Products
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Row>
                            <Col md={8}>
                                {items.map((item) => (
                                    <Card key={item.product.id} className="mb-3">
                                        <Card.Body>
                                            <Row className="align-items-center">
                                                <Col xs={3}>
                                                    <Image
                                                        src={item.product.image}
                                                        alt={item.product.name}
                                                        fluid
                                                        rounded
                                                        onError={handleImageError}
                                                    />
                                                </Col>
                                                <Col xs={4}>
                                                    <h5>{item.product.name}</h5>
                                                    <p className="text-muted">₹ {parseFloat(item.product.price || 0).toFixed(2)}</p>
                                                </Col>
                                                <Col xs={3}>
                                                    <div className="d-flex align-items-center">
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={<Tooltip>{item.quantity <= 1 ? "Minimum quantity is 1" : "Decrease quantity"}</Tooltip>}
                                                        >
                                                            <span>
                                                                <Button
                                                                    variant="outline-secondary"
                                                                    size="sm"
                                                                    disabled={item.quantity <= 1}
                                                                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                                                >
                                                                    -
                                                                </Button>
                                                            </span>
                                                        </OverlayTrigger>

                                                        <span className="mx-2">{item.quantity}</span>
                                                        <Button
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleQuantityChange(item.product.id, item.quantity + 1)
                                                            }
                                                        >
                                                            +
                                                        </Button>
                                                    </div>
                                                </Col>
                                                <Col xs={2}>
                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={<Tooltip>Remove item from cart</Tooltip>}
                                                    >
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleRemoveFromCart(item.product.id)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </OverlayTrigger>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Col>
                            <Col md={4}>
                                <Card>
                                    <Card.Body>
                                        <h4>Cart Summary</h4>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <span>Total Items:</span>
                                            <span>{totalItems}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Total Price:</span>
                                            <span>₹ {totalPrice.toFixed(2)}</span>
                                        </div>
                                        <Link to="/checkout">
                                            <Button variant="success" className="w-100 mt-3">
                                                Proceed to Checkout
                                            </Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </>
            )}

            {/* Remove confirmation modal */}
            <Modal show={showRemoveModal} onHide={cancelRemove} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Remove</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this item from your cart?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelRemove}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmRemove}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default CartPage;
