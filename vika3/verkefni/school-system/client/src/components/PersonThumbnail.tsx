import { Card, CardContent, CardHeader, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

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
    image: {
        height: 300,
        width: 200,
        alignSelf: 'center',
        objectFit: 'contain',
    },
});

interface Props {
    _id: string;
    name: string;
    birthdate: string;
    image: string;
    email: string;
    onContextMenu: (ev: React.MouseEvent) => void;
    type: 'student' | 'teacher';
}

export const PersonThumbnail: React.FC<Props> = ({ _id, name, birthdate, email, image, onContextMenu, type }) => {
    const history = useHistory();
    const classes = useStyles();
    return (
        <Card onContextMenu={onContextMenu} className={classes.root} onClick={() => history.push(`/${type}s/${_id}`)}>
            <CardHeader title={name} subheader={email} />
            <CardMedia className={classes.image} title={name} image={image} />
            <CardContent>
                <Typography variant="body1" component="p">
                    {`Born ${new Date(birthdate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}`}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PersonThumbnail;
