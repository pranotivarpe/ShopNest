import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../styles/about.css'

function AboutPage() {
    return (
        <Container className="about-page py-5">
            <h1 className="text-primary mb-4">About ShopNest</h1>

            <Row className="align-items-center mb-5">
                <Col md={6}>
                    <p className="lead">
                        Welcome to <strong>ShopNest</strong>, where we believe that shopping should be effortless, personal, and delightful. Born out of a passion for seamless online experiences, ShopNest brings you an e-commerce platform designed around your needs.
                    </p>
                    <ul>
                        <li>Extensive product selection across categories like electronics, fashion, home décor, and more.</li>
                        <li>User-friendly navigation, powerful search, and intuitive filtering to help you find exactly what you want.</li>
                        <li>Secure checkout and payment methods—your trust matters to us.</li>
                        <li>Responsive design optimized for all screen sizes and devices.</li>
                    </ul>
                </Col>
                <Col md={6}>
                    <img
                        src="/images/aboutimg.jpg"
                        alt="ShopNest storefront"
                        className="img-fluid rounded shadow"
                    />
                </Col>
            </Row>

            <section className="mission mb-5">
                <h2>Our Mission</h2>
                <p>
                    At ShopNest, our goal is to craft a shopping experience that feels intuitive and joyful. Whether you’re hunting for the latest gadget, stylish apparel, or cozy home décor, we’re here to make your online journey simple and stress-free.
                </p>
            </section>



            <section className="contact-us">
                <h2>Contact Us</h2>
                <p>
                    We'd love to hear from you! If you have questions, feedback, or just want to say hello—reach out at <a href="mailto:support@shopnest.com">support@shopnest.com</a> or visit our <a href="/contact">Contact Us</a> page.
                </p>
            </section>
        </Container>
    )
}

export default AboutPage
