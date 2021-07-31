import { makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BOOKS_URL } from '../services/urls';

const useStyles = makeStyles({
    text: {
        display: 'grid',
        placeItems: 'center',
        height: '70vh',
    },
    bookImage: {
        marginTop: '1rem',
        marginBottom: '1rem',
        width: '100%',
        height: 'auto',
        maxHeight: '500px',
        objectFit: 'contain',
    },
    root: {
        display: 'grid',
        placeItems: 'center',
        marginTop: '4rem',
        width: '80%',
        margin: '0 auto',
    },
    authorTitle: {
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.7,
        },
    },
    imageContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
    },
    pageCount: {
        alignSelf: 'flex-end',
    },
});

export const BookDetails = () => {
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [book, setBook] = useState<BookDto | null>(null);

    useEffect(() => {
        const getBook = async () => {
            const response = await fetch(`${BOOKS_URL}/${id}`);
            if (!response.ok) return history.push('/notfound');
            const book = await response.json();
            console.log(book);
            setBook(book);
        };
        getBook();
    }, [history, id]);

    return (
        <div>
            {!book && (
                <Typography className={classes.text} variant="h3">
                    Loading...
                </Typography>
            )}
            {book && (
                <div className={classes.root}>
                    <Typography variant="h4">{book.title}</Typography>

                    <Typography
                        onClick={() => history.push(`/authors/${book.author._id}`)}
                        className={classes.authorTitle}
                        variant="body1"
                        color="textSecondary"
                        component="p"
                    >
                        {book.author.name}
                    </Typography>
                    <div className={classes.imageContainer}>
                        <Typography className={classes.pageCount} variant="body2" color="textSecondary" component="p">
                            {book.pageCount} pages
                        </Typography>
                        <img src={book.image} alt="" className={classes.bookImage} />
                    </div>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {book.description}
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default BookDetails;
