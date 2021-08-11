import { makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { API_URL } from '../services/urls';
import Courses from './Courses';

const useStyles = makeStyles({
    text: {
        display: 'grid',
        placeItems: 'center',
        height: '70vh',
    },
    personImage: {
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
    imageContainer: {
        display: 'flex',
        flexFlow: 'column nowrap',
    },
    coursesContainer: {
        marginTop: '4rem',
    },
    dateContainer: {
        alignSelf: 'flex-start',
    },
});

export const PersonDetails = ({ type }: { type: 'teacher' | 'student' }) => {
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [person, setPerson] = useState<StudentEntity | null>(null);
    const [courses, setCourses] = useState<CourseEntity[]>([]);
    const pastCourses = useMemo<CourseEntity[]>(
        () => courses.filter((c) => new Date(c.endDate) <= new Date()),
        [courses],
    );
    const ongoingCourses = useMemo<CourseEntity[]>(
        () => courses.filter((c) => new Date(c.endDate) > new Date()),
        [courses],
    );

    useEffect(() => {
        const controller = new AbortController();
        const getData = async (controller: AbortController) => {
            try {
                const [personResponse, courseResponse] = await Promise.all([
                    fetch(`${API_URL}/${type}s/${id}`, { signal: controller.signal }),
                    fetch(`${API_URL}/${type}s/${id}/courses`, { signal: controller.signal }),
                ]);
                if (!personResponse.ok) return history.push('/notfound');
                setPerson(await personResponse.json());
                if (courseResponse.ok) {
                    setCourses(await courseResponse.json());
                }
            } catch (error) {
                if (error.name !== 'AbortError') console.log(error);
            }
        };
        getData(controller);
        return () => controller.abort();
    }, [history, id, type]);

    return (
        <div>
            {!person && (
                <Typography className={classes.text} variant="h3">
                    Loading...
                </Typography>
            )}
            {person && (
                <div className={classes.root}>
                    <Typography variant="h4">{person.name}</Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {person.email}
                    </Typography>
                    <div className={classes.imageContainer}>
                        <img src={person.image} alt="" className={classes.personImage} />
                        <Typography className={classes.dateContainer} variant="body1" component="p">
                            {`Born ${new Date(person.birthdate).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}`}
                        </Typography>
                    </div>
                    {pastCourses.length > 0 && (
                        <div className={classes.coursesContainer}>
                            <Typography variant="h4">Past courses</Typography>
                            <Courses initialCourses={pastCourses} />
                        </div>
                    )}
                    {ongoingCourses.length > 0 && (
                        <div className={classes.coursesContainer}>
                            <Typography variant="h4">Ongoing courses</Typography>
                            <Courses initialCourses={ongoingCourses} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PersonDetails;
