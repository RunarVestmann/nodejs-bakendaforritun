import { makeStyles, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { COURSES_URL } from '../services/urls';
import Students from './Students';
import Teachers from './Teachers';

const useStyles = makeStyles({
    text: {
        display: 'grid',
        placeItems: 'center',
        height: '70vh',
    },
    courseImage: {
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
        dispay: 'flex',
        flexFlow: 'column nowrap',
    },
    personText: {
        textAlign: 'center',
    },
});

export const CourseDetails = () => {
    const classes = useStyles();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [course, setCourse] = useState<CourseDTO | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const getData = async (controller: AbortController) => {
            try {
                const response = await fetch(`${COURSES_URL}/${id}`, { signal: controller.signal });
                if (!response.ok) return history.push('/notfound');
                const data = await response.json();
                setCourse(data);
            } catch (error) {
                if (error.name !== 'AbortError') console.log(error);
            }
        };
        getData(controller);
        return () => controller.abort();
    }, [history, id]);

    return (
        <div>
            {!course && (
                <Typography className={classes.text} variant="h3">
                    Loading...
                </Typography>
            )}
            {course && (
                <div className={classes.root}>
                    <Typography variant="h2">{course.name}</Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {`${new Date(course.startDate).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })} - ${new Date(course.endDate).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}`}
                    </Typography>

                    {course.teachers.length > 0 && (
                        <div className={classes.coursesContainer}>
                            <Typography className={classes.personText} variant="h4">
                                Teachers
                            </Typography>
                            <Teachers initialTeachers={course.teachers} />
                        </div>
                    )}
                    {course.teachingAssistants.length > 0 && (
                        <div className={classes.coursesContainer}>
                            <Typography className={classes.personText} variant="h4">
                                Teaching assistants
                            </Typography>
                            <Teachers initialTeachers={course.teachingAssistants} />
                        </div>
                    )}
                    {course.students.length > 0 && (
                        <div className={classes.coursesContainer}>
                            <Typography className={classes.personText} variant="h4">
                                Students
                            </Typography>
                            <Students initialStudents={course.students} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CourseDetails;
