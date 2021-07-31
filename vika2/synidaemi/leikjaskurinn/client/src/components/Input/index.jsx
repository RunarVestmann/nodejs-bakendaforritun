import styles from './style.module.css';

const Input = ({ type = 'text', onChange, label = '', placeholder = '', error }) => {
    return (
        <div className={styles.container}>
            {label && <p className={styles.label}>{label}</p>}
            {type === 'textarea' ? (
                <textarea onChange={onChange} placeholder={placeholder} />
            ) : (
                <input type={type} onChange={onChange} placeholder={placeholder} />
            )}
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
};

export default Input;
