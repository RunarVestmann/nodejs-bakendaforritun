import { Button, Grid, makeStyles } from '@material-ui/core';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ContextMenu from '../components/ContextMenu';
import { STUDENTS_URL } from '../services/urls';
import PersonDialog from '../components/PersonDialog';
import PersonThumbnail from '../components/PersonThumbnail';

const useStyles = makeStyles({
    root: {
        width: '80%',
        margin: '0 auto',
        marginTop: '2rem',
        marginBottom: '2rem',
    },
});

export const Students = ({ initialStudents }: { initialStudents?: StudentEntity[] }) => {
    const classes = useStyles();
    const [students, setStudents] = useState<StudentEntity[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ left: 0, top: 0 });
    const [activeId, setActiveId] = useState('');
    const editItem = useRef<StudentEntity | null | undefined>(null);
    const [editing, setEditing] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const controller = new AbortController();
        const getAllStudents = async (controller: AbortController) => {
            try {
                const response = await fetch(STUDENTS_URL, { signal: controller.signal });
                if (!initialStudents) setStudents(await response.json());
            } catch (error) {
                if (error.name !== 'AbortError') console.log(error);
            }
        };
        getAllStudents(controller);
        return () => controller.abort();
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
                    const data = students.find((s) => s._id === id);
                    editItem.current = data;
                    setEditing(true);
                }}
                onDeleteClicked={(id) => {
                    fetch(`${STUDENTS_URL}/${id}`, {
                        method: 'DELETE',
                    }).then(() => history.go(0));
                }}
            />
            <PersonDialog
                open={menuOpen}
                onClose={() => {
                    setMenuOpen(false);
                    setEditing(false);
                    editItem.current = null;
                }}
                edit={editing}
                initialState={editItem.current ? editItem.current : undefined}
                type="student"
            />
            <div className={classes.root}>
                {!initialStudents && <Button onClick={() => setMenuOpen(true)}>+ Add student</Button>}
                <Grid container={true} justifyContent="flex-start" alignItems="center">
                    {(initialStudents ? initialStudents : students).map((item) => (
                        <PersonThumbnail
                            key={item._id}
                            {...item}
                            onContextMenu={(ev) => {
                                ev.preventDefault();
                                setContextMenuOpen(true);
                                setContextMenuPosition({ left: ev.clientX, top: ev.clientY });
                                setActiveId(item._id);
                            }}
                            type="student"
                        />
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default Students;
