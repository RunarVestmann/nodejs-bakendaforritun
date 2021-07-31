import { makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ITEMS_URL } from '../services/urls';

const useStyles = makeStyles({
    text: {
        display: 'grid',
        placeItems: 'center',
        height: '70vh',
    },
    itemImage: {
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
});

export const ItemDetials = () => {
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [item, setItem] = useState<Item | null>(null);

    useEffect(() => {
        const getItem = async () => {
            const response = await fetch(`${ITEMS_URL}/${id}`);
            if (!response.ok) return history.push('/notfound');
            const item = await response.json();
            console.log(item);
            setItem(item);
        };
        getItem();
    }, [history, id]);

    return (
        <div>
            {!item && (
                <Typography className={classes.text} variant="h3">
                    Loading...
                </Typography>
            )}
            {item && (
                <div className={classes.root}>
                    <Typography variant="h4">{item.name}</Typography>
                    <div>
                        <Typography color="textSecondary">{item.quantity} left</Typography>
                        <img src={item.image} alt="" className={classes.itemImage} />
                        <Typography variant="body1" component="p">
                            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}kr
                        </Typography>
                    </div>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {item.description}
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default ItemDetials;
