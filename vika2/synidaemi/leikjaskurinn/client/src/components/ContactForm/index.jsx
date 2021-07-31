import { useState } from 'react';
import Form from '../Form';
import Input from '../Input';

const ContactForm = ({ onSubmit }) => {
    const [errors, setErrors] = useState({});
    const [state, setState] = useState({ name: '', message: '', email: '' });

    const handleSubmit = () => {
        const errors = {};
        if (state.name === '') errors.name = 'Name is required';
        if (state.email === '') errors.email = 'Email is required';
        if (state.message === '') errors.message = 'Message is required';
        if (Object.keys(errors).length === 0) onSubmit(state);
        else setErrors(errors);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input error={errors.name} label="Name" onChange={(ev) => setState({ ...state, name: ev.target.value })} />
            <Input
                error={errors.email}
                label="Email"
                onChange={(ev) => setState({ ...state, email: ev.target.value })}
            />
            <Input
                error={errors.message}
                label="Message"
                onChange={(ev) => setState({ ...state, message: ev.target.value })}
            />
        </Form>
    );
};

export default ContactForm;
