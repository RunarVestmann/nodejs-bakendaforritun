import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ITEMS_URL } from '../services/urls';

interface Props {
    open: boolean;
    onClose: () => void;
    edit: boolean;
    initialState?: Omit<Item, '_id'> & { _id?: string };
}

export const ItemDialog: React.FC<Props> = ({
    edit,
    open,
    onClose,
    initialState = { description: '', name: '', image: '', price: 0, quantity: 1 },
}) => {
    const [state, setState] = useState<Omit<Item, '_id'> & { _id?: string }>(initialState);
    const isSubmitting = useRef(false);
    const history = useHistory();

    useEffect(() => {
        if (initialState && edit) setState(initialState);
    }, [initialState, edit]);

    const handleChange = (ev: any) => setState((state) => ({ ...state, [ev.target.name]: ev.target.value }));

    const handleSubmit = async () => {
        if (isSubmitting.current) return;
        isSubmitting.current = true;

        const response = await fetch(edit ? `${ITEMS_URL}/${initialState._id as string}` : `${ITEMS_URL}`, {
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
            <DialogTitle>{edit ? 'Edit item' : 'Create item'}</DialogTitle>
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
                <TextField
                    value={state.price}
                    onChange={handleChange}
                    margin="dense"
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                />
                <TextField
                    value={state.quantity}
                    onChange={handleChange}
                    margin="dense"
                    name="quantity"
                    label="Quantity"
                    type="number"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ItemDialog;
