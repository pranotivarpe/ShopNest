import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col, Container, InputGroup, FormControl } from 'react-bootstrap'
import Product from '../components/Product'
import { useHistory } from "react-router-dom";
import { CREATE_PRODUCT_RESET } from '../constants'


function ProductsListPage() {

    let history = useHistory()
    let searchTerm = history.location.search
    const dispatch = useDispatch()

    // products list reducer
    const productsListReducer = useSelector(state => state.productsListReducer)
    const { loading, error, products } = productsListReducer

    useEffect(() => {
        dispatch(getProductsList())
        dispatch({
            type: CREATE_PRODUCT_RESET
        })
    }, [dispatch])

    const showNothingMessage = () => {
        return (
            <div className="text-center mt-5">
                {!loading ? <Message variant='info'>No products found</Message> : ""}
            </div>
        )
    }

    // filter products by search term
    const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(searchTerm !== "" ? searchTerm.split("=")[1] : "")
    )

    return (
        <Container className="mt-4">

            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-primary">Our Products</h2>
                <InputGroup style={{ maxWidth: "300px" }}>
                    <FormControl
                        placeholder="Search products..."
                        defaultValue={searchTerm ? searchTerm.split("=")[1] : ""}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                history.push(`/?search=${e.target.value.toLowerCase()}`)
                            }
                        }}
                    />
                </InputGroup>
            </div>

            {error && <Message variant='danger'>{error}</Message>}

            {loading ? (
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <Spinner animation="border" variant="primary" />
                    <h5 className="ms-2">Loading products...</h5>
                </div>
            ) : (
                <Row>
                    {filteredProducts.length === 0 ? (
                        showNothingMessage()
                    ) : (
                        filteredProducts.map((product) => (
                            <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                                <Product product={product} />
                            </Col>
                        ))
                    )}
                </Row>
            )}
        </Container>
    )
}

export default ProductsListPage
