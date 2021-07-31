import styles from './style.module.css';

const ResourceNotFound = () => {
    return (
        <div className={styles.container}>
            <p>Requested resource could not be found</p>
        </div>
    );
};

export default ResourceNotFound;
