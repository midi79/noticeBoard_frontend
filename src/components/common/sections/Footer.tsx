import styles from "./Footer.module.css";
import assignmentIcon from "../../../assets/icons/assignment.svg";
import calendarIcon from "../../../assets/icons/calendar.svg";

const Footer = () => {
    return (
        <footer className={styles.footer__wrapper}>
            <div className={styles.footer__content}>
                <div>
                    <img src={assignmentIcon} alt="Assignment" />
                </div>
                <div className={styles.footer__contact}>Contact : midi279@gmail.com</div>
                <div>
                    <img src={calendarIcon} alt="Calender" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
