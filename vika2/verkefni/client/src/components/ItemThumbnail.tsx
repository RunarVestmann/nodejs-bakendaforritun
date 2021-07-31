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
    itemImage: {
        height: 300,
        width: 200,
        alignSelf: 'center',
        objectFit: 'contain',
    },
});

export const ItemThumbnail: React.FC<Item & { onContextMenu: (ev: React.MouseEvent) => void }> = ({
    _id,
    name,
    quantity,
    price,
    description,
    image,
    onContextMenu,
}) => {
    const history = useHistory();
    const classes = useStyles();
    return (
        <Card onContextMenu={onContextMenu} className={classes.root} onClick={() => history.push(`/items/${_id}`)}>
            <CardHeader title={name} subheader={`${quantity} left`} />
            <CardMedia className={classes.itemImage} title={name} image={image} />
            <CardContent>
                <Typography variant="body1" component="p">
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}kr
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {shorten(description)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ItemThumbnail;
