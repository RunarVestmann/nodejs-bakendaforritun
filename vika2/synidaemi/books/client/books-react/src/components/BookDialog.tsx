import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField,
} from '@material-ui/core';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BOOKS_URL } from '../services/urls';
import { shorten } from '../utils/stringUtils';

interface Props {
    open: boolean;
    onClose: () => void;
    edit: boolean;
    authors: AuthorEntity[];
    initialState?: Omit<BookEntity, '_id'> & { _id?: string };
}

export const BookDialog: React.FC<Props> = ({
    edit,
    open,
    onClose,
    authors,
    initialState = { description: '', title: '', pageCount: 0, image: '', author: '' },
}) => {
    const [state, setState] = useState<Omit<BookEntity, '_id'> & { _id?: string }>(initialState);
    const [author, setAuthor] = useState(
        initialState.author ? authors.find((a) => a._id === initialState.author) : authors[0],
    );
    const isSubmitting = useRef(false);
    const history = useHistory();

    useEffect(() => {
        if (initialState && edit) setState(initialState);
    }, [initialState, edit]);

    const handleSelection = (ev: any) => {
        handleChange(ev);
        setAuthor(authors.find((a) => a._id === ev.target.value));
    };

    const handleChange = (ev: any) => {
        setState((state) => ({ ...state, [ev.target.name]: ev.target.value }));
    };

    const handleSubmit = async () => {
        if (isSubmitting.current) return;
        isSubmitting.current = true;

        const response = await fetch(edit ? `${BOOKS_URL}/${initialState._id as string}` : `${BOOKS_URL}`, {
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
            <DialogTitle>{edit ? 'Edit book' : 'Create book'}</DialogTitle>
            <DialogContent>
                <TextField
                    value={state.title}
                    onChange={handleChange}
                    autoFocus
                    name="title"
                    margin="dense"
                    label="Title"
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
                    value={state.pageCount}
                    onChange={handleChange}
                    margin="dense"
                    name="pageCount"
                    label="Page Count"
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
                <Select
                    style={{ marginTop: '1.5rem' }}
                    onChange={handleSelection}
                    value={author?._id || initialState.author || ''}
                    defaultValue=""
                    margin="dense"
                    name="author"
                    label="Author"
                    fullWidth
                >
                    {authors.map((a) => (
                        <MenuItem key={a._id} value={a._id}>
                            {shorten(a.name, 60)}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookDialog;
