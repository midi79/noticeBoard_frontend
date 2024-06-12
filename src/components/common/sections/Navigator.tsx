import { useNavigate } from "react-router-dom";
import styles from "./Navigator.module.css";

const Navigator = () => {
    const navigate = useNavigate();
    const menus = ["Board", "Calendar"];

    const onMenuClickHandler = (menu: string) => {
        const page = menu.toLowerCase();
        navigate(`/pages/${page}`);
    };

    return (
        <nav className={styles.nav__wrapper}>
            {menus.map((menu) => (
                <span key={menu} className={styles.nav__menu} onClick={() => onMenuClickHandler(menu)}>
                    {menu}
                </span>
            ))}
        </nav>
    );
};

export default Navigator;
