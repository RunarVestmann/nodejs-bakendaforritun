import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    text: {
        display: 'grid',
        placeItems: 'center',
        height: '70vh',
    },
});

export const NotFound = () => {
    const classes = useStyles();
    return (
        <Typography className={classes.text} variant="h3">
            What you were looking for could not be found
        </Typography>
    );
};

export default NotFound;
