import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Image, Spinner, Modal } from 'react-bootstrap';
import Message from '../components/Message';
import { getCart, removeFromCart, updateCartItem } from '../actions/cartActions';

// Custom Tooltip Component to replace OverlayTrigger
const CustomTooltip = ({ text, children, placement = 'top' }) => {
    const [show, setShow] = useState(false);

    return (
        <div
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            {children}
            {show && (
                <div style={{
                    position: 'absolute',
                    bottom: placement === 'top' ? '100%' : 'auto',
                    top: placement === 'bottom' ? '100%' : 'auto',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    whiteSpace: 'nowrap',
                    zIndex: 1000,
                    marginBottom: placement === 'top' ? '5px' : '0',
                    marginTop: placement === 'bottom' ? '5px' : '0',
                    pointerEvents: 'none'
                }}>
                    {text}
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        border: '5px solid transparent',
                        [placement === 'top' ? 'top' : 'bottom']: '100%',
                        borderColor: placement === 'top'
                            ? 'rgba(0, 0, 0, 0.8) transparent transparent transparent'
                            : 'transparent transparent rgba(0, 0, 0, 0.8) transparent'
                    }}></div>
                </div>
            )}
        </div>
    );
};

function CartPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const userLoginReducer = useSelector((state) => state.userLoginReducer);
    const { userInfo } = userLoginReducer;

    const cartReducer = useSelector((state) => state.cartReducer);
    const { loading, error, cart } = cartReducer;

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

            {loading && (
                <div className="d-flex justify-content-center align-items-center my-5">
                    <Spinner animation="border" />
                    <h5 className="ml-3">Loading cart...</h5>
                </div>
            )}

            {error && (
                <Message variant="danger">
                    {error}
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
                                                        <CustomTooltip
                                                            text={item.quantity <= 1 ? "Minimum quantity is 1" : "Decrease quantity"}
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
                                                        </CustomTooltip>

                                                        <span className="mx-2">{item.quantity}</span>
                                                        <CustomTooltip text="Increase quantity">
                                                            <Button
                                                                variant="outline-secondary"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleQuantityChange(item.product.id, item.quantity + 1)
                                                                }
                                                            >
                                                                +
                                                            </Button>
                                                        </CustomTooltip>
                                                    </div>
                                                </Col>
                                                <Col xs={2}>
                                                    <CustomTooltip text="Remove item from cart">
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleRemoveFromCart(item.product.id)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </CustomTooltip>
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
                                        <Link to="/cartcheckout">
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