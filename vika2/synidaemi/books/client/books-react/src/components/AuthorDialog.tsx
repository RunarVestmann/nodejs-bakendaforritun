import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AUTHORS_URL } from '../services/urls';

interface Props {
    open: boolean;
    onClose: () => void;
    edit: boolean;
    authors: AuthorEntity[];
    initialState?: Omit<AuthorEntity, '_id'> & { _id?: string };
}

export const AuthorDialog: React.FC<Props> = ({
    edit,
    open,
    onClose,
    authors,
    initialState = { description: '', name: '', image: '', birthdate: new Date() },
}) => {
    const [state, setState] = useState<Omit<AuthorEntity, '_id'> & { _id?: string }>(initialState);
    const isSubmitting = useRef(false);
    const history = useHistory();

    useEffect(() => {
        if (initialState && edit) setState(initialState);
    }, [initialState, edit]);

    const handleChange = (ev: any) => {
        setState((state) => ({ ...state, [ev.target.name]: ev.target.value }));
    };

    const handleSubmit = async () => {
        if (isSubmitting.current) return;
        isSubmitting.current = true;

        const response = await fetch(edit ? `${AUTHORS_URL}/${initialState._id as string}` : `${AUTHORS_URL}`, {
            method: edit ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        });
        if (!response.ok) return (isSubmitting.current = false);
        history.go(0);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{edit ? 'Edit Author' : 'Create Author'}</DialogTitle>
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
                    value={state.birthdate}
                    onChange={handleChange}
                    margin="dense"
                    name="birthdate"
                    label="Birthdate"
                    type="text"
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
                    value={state.description}
                    onChange={handleChange}
                    margin="dense"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AuthorDialog;
