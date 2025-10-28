
import React, { useState, useEffect } from "react";

const ValidatedInput = ({ validationFunction, errorMessage }: { validationFunction: (a: string) => boolean; errorMessage: string }) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (value === "") {
            setError("");
        } else if (!validationFunction(value)) {
            setError(errorMessage);
        } else {
            setError("");
        }
    }, [value, validationFunction, errorMessage]);

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
    );
};

export default ValidatedInput;