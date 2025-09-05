import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100px" }}>
            <Spinner
                animation="border"
                role="status"
                style={{ width: "50px", height: "50px", margin: "auto", display: "block" }}
            >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loader;
