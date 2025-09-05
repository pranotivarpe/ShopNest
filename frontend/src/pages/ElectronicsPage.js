import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col, Container } from 'react-bootstrap'
import Product from '../components/Product'
import { CREATE_PRODUCT_RESET } from '../constants'

function ElectronicsPage() {
    const dispatch = useDispatch();

    // Redux state
    const productsListReducer = useSelector(state => state.productsListReducer);
    const { loading, error, products } = productsListReducer;

    useEffect(() => {
        dispatch(getProductsList());
        dispatch({ type: CREATE_PRODUCT_RESET });
    }, [dispatch]);

    // ✅ Filter only Electronics products
    const electronicsProducts = products.filter(
        (item) => item.category && item.category.toLowerCase() === "electronics"
    );

    const showNothingMessage = () => (
        <div className="text-center mt-5">
            {!loading && <Message variant='info'>No electronics found</Message>}
        </div>
    );

    return (
        <Container className="mt-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-primary">Electronics</h2>
            </div>

            {error && <Message variant='danger'>{error}</Message>}

            {loading ? (
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <Spinner animation="border" variant="primary" />
                    <h5 className="ms-2">Loading electronics...</h5>
                </div>
            ) : (
                <Row>
                    {electronicsProducts.length === 0 ? (
                        showNothingMessage()
                    ) : (
                        electronicsProducts.map((product) => (
                            <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                                <Product product={product} />
                            </Col>
                        ))
                    )}
                </Row>
            )}
        </Container>
    );
}

export default ElectronicsPage;
