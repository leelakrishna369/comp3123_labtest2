import React, { useState } from "react";

const SearchBar = ({ setCity }) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setCity(input.trim());
            setInput("");
            setError("");
        } else {
            setError("Please enter a valid city name.");
        }
    };

    return (
        <form onSubmit={handleSearch} className="mb-4">
            <div className="input-group">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        setError(""); // Clear error on typing
                    }}
                    className={`form-control ${error ? "is-invalid" : ""}`}
                    placeholder="Enter city name"
                    aria-label="City Name"
                />
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!input.trim()}
                    aria-label="Search City"
                >
                    Search
                </button>
            </div>
            {error && <p className="text-danger mt-2">{error}</p>}
        </form>
    );
};

export default SearchBar;
