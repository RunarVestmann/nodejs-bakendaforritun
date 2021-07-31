import { Button, Grid, makeStyles } from '@material-ui/core';
import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BookDialog from '../components/BookDialog';
import BookThumbnail from '../components/BookThumbnail';
import ContextMenu from '../components/ContextMenu';
import { AUTHORS_URL, BOOKS_URL } from '../services/urls';

const useStyles = makeStyles({
    root: {
        width: '80%',
        margin: '0 auto',
        marginTop: '2rem',
        marginBottom: '2rem',
    },
});

interface Props {
    initialBooks?: BookDto[];
}

export const Books: React.FC<Props> = ({ initialBooks }) => {
    const classes = useStyles();
    const [books, setBooks] = useState<BookDto[]>(initialBooks || []);
    const [authors, setAuthors] = useState<AuthorEntity[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ left: 0, top: 0 });
    const [activeId, setActiveId] = useState('');
    const editBook = useRef<BookEntity | null | undefined>(null);
    const [editing, setEditing] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (initialBooks) setBooks(initialBooks);
    }, [initialBooks]);

    useEffect(() => {
        const getAllBooksAndAuthors = async () => {
            const [bookResponse, authorResponse] = await Promise.all([fetch(BOOKS_URL), fetch(AUTHORS_URL)]);
            if (!initialBooks) setBooks(await bookResponse.json());
            setAuthors(await authorResponse.json());
        };
        getAllBooksAndAuthors();
    }, [initialBooks]);

    return (
        <>
            <ContextMenu
                position={contextMenuPosition}
                open={contextMenuOpen}
                onClose={() => setContextMenuOpen(false)}
                activeId={activeId}
                onEditClicked={(id) => {
                    setMenuOpen(true);
                    const data = books.find((b) => b._id === id) as BookDto;
                    editBook.current = { ...data, author: data.author._id };
                    setEditing(true);
                }}
                onDeleteClicked={(id) => {
                    fetch(`${BOOKS_URL}/${id}`, {
                        method: 'DELETE',
                    }).then(() => history.go(0));
                }}
            />
            <BookDialog
                open={menuOpen}
                onClose={() => {
                    setMenuOpen(false);
                    setEditing(false);
                    editBook.current = null;
                }}
                edit={editing}
                initialState={editBook.current ? editBook.current : undefined}
                authors={authors}
            />
            <div className={classes.root}>
                {!initialBooks && <Button onClick={() => setMenuOpen(true)}>+ Add book</Button>}
                <Grid container={true} justifyContent="flex-start" alignItems="center">
                    {(initialBooks ? initialBooks : books).map((book) => (
                        <BookThumbnail
                            key={book._id}
                            {...book}
                            onContextMenu={(ev) => {
                                ev.preventDefault();
                                setContextMenuOpen(true);
                                setContextMenuPosition({ left: ev.clientX, top: ev.clientY });
                                setActiveId(book._id);
                            }}
                        />
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default Books;
