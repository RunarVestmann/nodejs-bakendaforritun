import { Button, Grid, makeStyles } from '@material-ui/core';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ContextMenu from '../components/ContextMenu';
import { COURSES_URL } from '../services/urls';
import CourseDialog from '../components/CourseDialog';
import CourseThumbnail from '../components/CourseThumbnail';

const useStyles = makeStyles({
    root: {
        width: '80%',
        margin: '0 auto',
        marginTop: '2rem',
        marginBottom: '2rem',
    },
});

export const Courses: React.FC<{ initialCourses?: CourseEntity[] }> = ({ initialCourses }) => {
    const classes = useStyles();
    const [courses, setCourses] = useState<CourseEntity[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ left: 0, top: 0 });
    const [activeId, setActiveId] = useState('');
    const editItem = useRef<CourseEntity | null | undefined>(null);
    const [editing, setEditing] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const getAllCourses = async () => {
            const response = await fetch(COURSES_URL);
            if (!initialCourses) setCourses(await response.json());
        };
        getAllCourses();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <ContextMenu
                position={contextMenuPosition}
                open={contextMenuOpen}
                onClose={() => setContextMenuOpen(false)}
                activeId={activeId}
                onEditClicked={(id) => {
                    setMenuOpen(true);
                    const data = courses.find((c) => c._id === id);
                    editItem.current = data;
                    setEditing(true);
                }}
                onDeleteClicked={(id) => {
                    fetch(`${COURSES_URL}/${id}`, {
                        method: 'DELETE',
                    }).then(() => history.go(0));
                }}
            />
            <CourseDialog
                open={menuOpen}
                onClose={() => {
                    setMenuOpen(false);
                    setEditing(false);
                    editItem.current = null;
                }}
                edit={editing}
                initialState={editItem.current ? editItem.current : undefined}
            />
            <div className={classes.root}>
                {!initialCourses && <Button onClick={() => setMenuOpen(true)}>+ Add course</Button>}
                <Grid container={true} justifyContent="flex-start" alignItems="center">
                    {(initialCourses ? initialCourses : courses).map((item) => (
                        <CourseThumbnail
                            key={item._id}
                            {...item}
                            onContextMenu={(ev: { preventDefault: () => void; clientX: any; clientY: any }) => {
                                ev.preventDefault();
                                setContextMenuOpen(true);
                                setContextMenuPosition({ left: ev.clientX, top: ev.clientY });
                                setActiveId(item._id);
                            }}
                        />
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default Courses;
