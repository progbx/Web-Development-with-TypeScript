import React from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
    id: string;
}

const Input: React.FC<InputProps> = ({ labelText, id, ...rest }) => {
    return (
        <div>
            <label htmlFor={id} className={styles["label-module"]}>
                {labelText}
            </label>
            <input id={id} className={styles["input-module"]} {...rest} />
        </div>
    );
};

export default Input;
