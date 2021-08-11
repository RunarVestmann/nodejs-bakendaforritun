import { Card, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { shorten } from '../utils/stringUtils';

const useStyles = makeStyles({
    root: {
        width: 270,

        margin: '1rem',
        display: 'flex',
        flexFlow: 'column nowrap',
        transition: 'transform 0.2s',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
});

type Props = {
    _id: string;
    onContextMenu: (ev: React.MouseEvent) => void;
} & CourseEntity;

export const CourseThumbnail: React.FC<Props> = ({ _id, name, description, startDate, endDate, onContextMenu }) => {
    const history = useHistory();
    const classes = useStyles();
    return (
        <Card onContextMenu={onContextMenu} className={classes.root} onClick={() => history.push(`/courses/${_id}`)}>
            <CardHeader
                title={name}
                subheader={`${new Date(startDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })} - ${new Date(endDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}`}
            />
            <CardContent>
                <Typography variant="body1" color="textSecondary" component="p">
                    {shorten(description)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CourseThumbnail;
