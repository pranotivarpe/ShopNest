import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col, Container } from 'react-bootstrap'
import Product from '../components/Product'
import { CREATE_PRODUCT_RESET } from '../constants'

function DecorPage() {
    const dispatch = useDispatch();

    const productsListReducer = useSelector(state => state.productsListReducer);
    const { loading, error, products } = productsListReducer;

    useEffect(() => {
        dispatch(getProductsList());
        dispatch({ type: CREATE_PRODUCT_RESET });
    }, [dispatch]);

    // ✅ Filter only Decor products
    const decorProducts = products.filter(
        (item) => item.category && item.category.toLowerCase() === "decor"
    );

    const showNothingMessage = () => (
        <div className="text-center mt-5">
            {!loading && <Message variant='info'>No decor items found</Message>}
        </div>
    );

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-primary">Decor</h2>
            </div>

            {error && <Message variant='danger'>{error}</Message>}

            {loading ? (
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <Spinner animation="border" variant="primary" />
                    <h5 className="ms-2">Loading decor...</h5>
                </div>
            ) : (
                <Row>
                    {decorProducts.length === 0 ? (
                        showNothingMessage()
                    ) : (
                        decorProducts.map((product) => (
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

export default DecorPage;
