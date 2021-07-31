import { makeStyles, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AUTHORS_URL } from '../services/urls';
import Books from './Books';

const useStyles = makeStyles({
    text: {
        display: 'grid',
        placeItems: 'center',
        height: '70vh',
    },
    authorImage: {
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
    books: {
        marginTop: '4rem',
        alignSelf: 'center',
    },
    booksGrid: {
        width: '80%',
        margin: '0 auto',
        marginTop: '2rem',
        marginBottom: '2rem',
    },
});

export const AuthorDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [author, setAuthor] = useState<AuthorEntity | null>(null);
    const [books, setBooks] = useState<BookEntity[]>([]);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        const getAuthor = async () => {
            const [authorResponse, bookResponse] = await Promise.all([
                fetch(`${AUTHORS_URL}/${id}`),
                fetch(`${AUTHORS_URL}/${id}/books`),
            ]);
            if (!authorResponse.ok) return history.push('/notfound');
            setAuthor(await authorResponse.json());
            if (!bookResponse.ok) return;
            setBooks(await bookResponse.json());
        };
        getAuthor();
    }, [id, history]);

    return (
        <div>
            {!author && (
                <Typography className={classes.text} variant="h3">
                    Loading...
                </Typography>
            )}
            {author && (
                <div className={classes.root}>
                    <Typography variant="h4">{author.name}</Typography>
                    <img src={author.image} alt="" className={classes.authorImage} />
                    <Typography variant="body1" color="textSecondary" component="p">
                        {author.description}
                    </Typography>
                    <div className={classes.books}>
                        <div>{books.length > 0 && <Typography variant="h4">Books</Typography>}</div>
                        <Books initialBooks={books.map((b) => ({ ...b, author: author }))} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthorDetails;
