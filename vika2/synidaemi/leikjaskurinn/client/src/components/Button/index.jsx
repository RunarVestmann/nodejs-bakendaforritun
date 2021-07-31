import styles from './style.module.css';

const Button = ({ children, onClick, style = {}, type = 'button' }) => {
    return (
        <button className={styles.button} onClick={onClick} style={style} type={type}>
            {children}
        </button>
    );
};

export default Button;
