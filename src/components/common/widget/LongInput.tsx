import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./LongInput.module.css";

interface ILongInputProps {
    type: string;
    placeholder: string;
    name: string;
    width?: number;
    defaultValue?: string | number | readonly string[] | undefined;
    readOnly?: boolean | undefined;
    rest?: InputHTMLAttributes<HTMLInputElement> | undefined | null;
    ref?: React.ForwardedRef<HTMLInputElement> | undefined;
}

const LongInput = forwardRef<HTMLInputElement, ILongInputProps>(
    ({ type, placeholder, name, width, defaultValue, readOnly, ...rest }, ref?) => {
        return (
            <div className={styles.long__input__wrapper} style={{ width: width }}>
                <input
                    type={type}
                    name={name}
                    className={styles.long__input__content}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    readOnly={readOnly}
                    ref={ref}
                    {...rest}
                />
            </div>
        );
    }
);

export default LongInput;
