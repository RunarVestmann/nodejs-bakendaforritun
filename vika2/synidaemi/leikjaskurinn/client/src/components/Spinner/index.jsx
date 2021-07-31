import spinnerImage from '../../assets/loading.gif';
import styles from './style.module.css';

const Spinner = () => {
    return (
        <div className={styles.container}>
            <img src={spinnerImage} alt="spinner" />
        </div>
    );
};

export default Spinner;
