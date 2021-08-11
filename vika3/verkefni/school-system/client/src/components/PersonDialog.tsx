import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../services/urls';

interface Props {
    open: boolean;
    onClose: () => void;
    edit: boolean;
    initialState?: Omit<StudentEntity, '_id'> & { _id?: string };
    type: 'teacher' | 'student';
}

export const PersonDialog: React.FC<Props> = ({
    edit,
    open,
    onClose,
    initialState = { name: '', image: '', birthdate: '', email: '' },
    type,
}) => {
    const [state, setState] = useState<Omit<StudentEntity, '_id'> & { _id?: string }>(initialState);
    const isSubmitting = useRef(false);
    const history = useHistory();

    useEffect(() => {
        if (initialState && edit) setState(initialState);
    }, [initialState, edit]);

    const handleChange = (ev: any) => setState((state) => ({ ...state, [ev.target.name]: ev.target.value }));

    const handleSubmit = async () => {
        if (isSubmitting.current) return;
        isSubmitting.current = true;

        const response = await fetch(
            edit ? `${API_URL}/${type}s/${initialState._id as string}` : `${API_URL}/${type}s`,
            {
                method: edit ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state),
            },
        );
        if (!response.ok) return (isSubmitting.current = false);
        history.go(0);
    };

    const upperCaseType = type.charAt(0).toUpperCase() + type.slice(1);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{edit ? `Edit ${upperCaseType}` : `Create ${upperCaseType}`}</DialogTitle>
            <DialogContent>
                <TextField
                    value={state.name}
                    onChange={handleChange}
                    autoFocus
                    name="name"
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                />
                <TextField
                    value={state.email}
                    onChange={handleChange}
                    margin="dense"
                    name="email"
                    label="E-mail"
                    type="email"
                    fullWidth
                />
                <TextField
                    value={state.image}
                    onChange={handleChange}
                    margin="dense"
                    name="image"
                    label="Image"
                    type="text"
                    fullWidth
                />
                <TextField
                    value={state.birthdate.split('T')[0]}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange}
                    margin="dense"
                    name="birthdate"
                    label="Birth date"
                    type="date"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PersonDialog;
