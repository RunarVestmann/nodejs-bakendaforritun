import { Card, CardContent, CardHeader, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { shorten } from '../utils/stringUtils';

const useStyles = makeStyles({
    root: {
        width: 270,
        height: 450,
        margin: '1rem',
        display: 'flex',
        flexFlow: 'column nowrap',

        transition: 'transform 0.2s',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    bookImage: {
        height: 300,
        width: 200,
        alignSelf: 'center',
        objectFit: 'contain',
    },
});

export const BookThumbnail: React.FC<BookDto & { onContextMenu: (ev: React.MouseEvent) => void }> = ({
    _id,
    author,
    title,
    description,
    pageCount,
    image,
    onContextMenu,
}) => {
    const history = useHistory();
    const classes = useStyles();
    return (
        <Card onContextMenu={onContextMenu} className={classes.root} onClick={() => history.push(`/books/${_id}`)}>
            <CardHeader title={title} subheader={author.name} />
            <CardMedia className={classes.bookImage} title={title} image={image} />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {shorten(description)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BookThumbnail;
