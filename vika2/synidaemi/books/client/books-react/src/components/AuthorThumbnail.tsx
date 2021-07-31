import { Card, CardContent, CardHeader, CardMedia, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { shorten } from '../utils/stringUtils';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
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

export const AuthorThumbnail: React.FC<AuthorEntity & { onContextMenu: (ev: React.MouseEvent) => void }> = ({
    _id,
    description,
    image,
    name,
    birthdate,
    onContextMenu,
}) => {
    const history = useHistory();
    const classes = useStyles();
    return (
        <Card onContextMenu={onContextMenu} className={classes.root} onClick={() => history.push(`/authors/${_id}`)}>
            <CardHeader
                title={name}
                subheader={`Born ${new Date(birthdate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}`}
            />
            <CardMedia className={classes.bookImage} title={name} image={image} />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {shorten(description)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AuthorThumbnail;
