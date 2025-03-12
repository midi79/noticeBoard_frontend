import styles from "./IntroPage.module.css";
import { useEffect, useRef } from "react";

const IntroPage = () => {
    const idRef = useRef<HTMLInputElement>(null);
    // const passwordRef = useRef<HTMLInputElement>(null);

    // const onLoginClickHandler = () => {
    //     console.log(idRef.current?.value, passwordRef.current?.value);
    // };

    // const onRegisterClickHandler = () => {
    //     console.log("Register!");
    // };

    useEffect(() => {
        idRef && idRef.current?.focus();
    }, []);

    return (
        <section className={styles.intro__wrapper}>
            <div className={styles.intro__background}></div>
            <div className={styles.intro__input}>
                <div className={styles.intro__text}>
                    <p>Welcome to React Notice Board</p>
                    {/* <p>Please login</p> */}
                </div>
                {/* <div>
                    <Input type="text" placeholder="ID" ref={idRef} />
                </div>
                <div>
                    <Input type="password" placeholder="Password" ref={passwordRef} />
                </div>
                <div className={styles.intro__button}>
                    <Button title="Login" onClickHandler={onLoginClickHandler} />
                    <Button title="Register" onClickHandler={onRegisterClickHandler} />
                </div> */}
            </div>
        </section>
    );
};

export default IntroPage;
