import { useNavigate } from "react-router-dom";
import Button from "../widget/Button";
import styles from "./Header.module.css";
import noticeboardImage from "../../../assets/images/noticeboard.png";

const Header = () => {
    const navigate = useNavigate();

    const onClickLogoutHandler = (): void => {
        console.log("logout");
    };

    const onTitleClickHandler = (): void => {
        navigate("/");
    };

    return (
        <header className={styles.header__wrapper}>
            <div className={styles.header__title} onClick={onTitleClickHandler}>
                <img src={noticeboardImage} alt="Notice board" />
                <p>React Notice Board</p>
            </div>
            <div className={styles.header__tail}>
                <Button title="Logout" onClickHandler={onClickLogoutHandler} />
            </div>
        </header>
    );
};

export default Header;
