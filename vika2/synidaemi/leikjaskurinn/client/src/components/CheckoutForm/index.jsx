import { useState } from 'react';
import Form from '../Form';
import Input from '../Input';

const CheckoutForm = ({ onSubmit }) => {
    const [errors, setErrors] = useState({});
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        country: '',
        city: '',
        postal: '',
    });

    const handleSubmit = () => {
        const errors = {};
        if (state.firstName === '') errors.firstName = 'First name is required';
        if (state.lastName === '') errors.lastName = 'Last name is required';
        if (state.email === '') errors.email = 'Email is required';
        if (state.address === '') errors.address = 'Address is required';
        if (state.country === '') errors.country = 'Country is required';
        if (state.city === '') errors.city = 'City/Town is required';
        if (state.postal === '') errors.postal = 'Postal code is required';
        if (Object.keys(errors).length === 0) onSubmit(state);
        else setErrors(errors);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                error={errors.firstName}
                label="First name:"
                onChange={(ev) => setState((state) => ({ ...state, firstName: ev.target.value }))}
            />
            <Input
                error={errors.lastName}
                label="Last name:"
                onChange={(ev) => setState((state) => ({ ...state, lastName: ev.target.value }))}
            />
            <Input
                error={errors.email}
                label="Email:"
                onChange={(ev) => setState((state) => ({ ...state, email: ev.target.value }))}
                type="email"
            />
            <Input
                error={errors.address}
                label="Address:"
                onChange={(ev) => setState((state) => ({ ...state, address: ev.target.value }))}
            />
            <Input
                error={errors.country}
                label="Country:"
                onChange={(ev) => setState((state) => ({ ...state, country: ev.target.value }))}
            />
            <Input
                error={errors.city}
                label="City/Town:"
                onChange={(ev) => setState((state) => ({ ...state, city: ev.target.value }))}
            />
            <Input
                error={errors.postal}
                label="Postal code:"
                onChange={(ev) => setState((state) => ({ ...state, postal: ev.target.value }))}
            />
        </Form>
    );
};

export default CheckoutForm;
