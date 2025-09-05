import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import "../styles/product.css";

function Product({ product }) {
    return (
        <Card className="product-card">
            <Link to={`/product/${product.id}`}>
                <div className="product-image-container">
                    <Card.Img
                        variant="top"
                        src={product.image || "/images/placeholder.png"}
                        alt={product.name}
                        className="product-image"
                    />
                </div>
            </Link>

            <Card.Body className="text-center">
                <Link to={`/product/${product.id}`} className="text-decoration-none">
                    <Card.Title as="div" className="product-title">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="h3" className="product-price">
                    {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                    }).format(product.price)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;
