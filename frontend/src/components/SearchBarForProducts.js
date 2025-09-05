import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchBarForProducts() {
    const history = useHistory();
    const [searchTerm, setSearchTerm] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            history.push(`/?search=${searchTerm.toLowerCase()}`);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <form onSubmit={onSubmit}>
                <span style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Search products"
                        className="form-control"
                        style={{
                            flex: 1,
                            padding: "12px 15px",
                            fontSize: "1rem",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            minWidth: "400px"
                        }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary ml-2"
                        style={{
                            padding: "12px 18px",
                            borderRadius: "8px"
                        }}
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </span>
            </form>
        </div>
    );
}

export default SearchBarForProducts;
