import { useState } from 'react';
import ContactForm from '../../components/ContactForm';
import { sendMessage } from '../../services/messageService';
import TextContent from '../../components/TextContent';
import Button from '../../components/Button';
import { useHistory } from 'react-router';
import styles from './style.module.css';

const Contact = () => {
    const [messageSubmitted, setMessageSubmitted] = useState(false);
    const history = useHistory();

    const handleSubmit = (message) => {
        sendMessage(message);
        setMessageSubmitted(true);
    };

    return !messageSubmitted ? (
        <ContactForm onSubmit={handleSubmit} />
    ) : (
        <div className={styles.successContainer}>
            <TextContent
                heading="Message has been delivered"
                text="Your message will receive a response within the next 24 hours. Thank you for reaching out."
            />
            <Button style={{ alignSelf: 'flex-end' }} onClick={() => history.push('/products')}>
                Back to homepage
            </Button>
        </div>
    );
};

export default Contact;
