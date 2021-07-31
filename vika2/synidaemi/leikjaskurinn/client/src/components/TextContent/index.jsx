import styles from './style.module.css';

const TextContent = ({ heading, text }) => {
    return (
        <div className={styles.container}>
            {heading && <h2 className={styles.heading}>{heading}</h2>}
            <p>{text}</p>
        </div>
    );
};

export default TextContent;
