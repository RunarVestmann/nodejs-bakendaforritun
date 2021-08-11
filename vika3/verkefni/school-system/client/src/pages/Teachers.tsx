import { Button, Grid, makeStyles } from '@material-ui/core';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ContextMenu from '../components/ContextMenu';
import { TEACHERS_URL } from '../services/urls';
import PersonThumbnail from '../components/PersonThumbnail';
import PersonDialog from '../components/PersonDialog';

const useStyles = makeStyles({
    root: {
        width: '80%',
        margin: '0 auto',
        marginTop: '2rem',
        marginBottom: '2rem',
    },
});

export const Teachers = ({ initialTeachers }: { initialTeachers?: TeacherEntity[] }) => {
    const classes = useStyles();
    const [teachers, setTeachers] = useState<TeacherEntity[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ left: 0, top: 0 });
    const [activeId, setActiveId] = useState('');
    const editItem = useRef<TeacherEntity | null | undefined>(null);
    const [editing, setEditing] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const controller = new AbortController();
        const getAllTeachers = async (controller: AbortController) => {
            try {
                const response = await fetch(TEACHERS_URL, { signal: controller.signal });
                if (!initialTeachers) setTeachers(await response.json());
            } catch (error) {
                if (error.name !== 'AbortError') console.log(error);
            }
        };
        getAllTeachers(controller);
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
                    const data = teachers.find((b) => b._id === id);
                    editItem.current = data;
                    setEditing(true);
                }}
                onDeleteClicked={(id) => {
                    fetch(`${TEACHERS_URL}/${id}`, {
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
                type="teacher"
            />
            <div className={classes.root}>
                {!initialTeachers && <Button onClick={() => setMenuOpen(true)}>+ Add teacher</Button>}
                <Grid container={true} justifyContent="flex-start" alignItems="center">
                    {(initialTeachers ? initialTeachers : teachers).map((item) => (
                        <PersonThumbnail
                            key={item._id}
                            {...item}
                            onContextMenu={(ev: { preventDefault: () => void; clientX: any; clientY: any }) => {
                                ev.preventDefault();
                                setContextMenuOpen(true);
                                setContextMenuPosition({ left: ev.clientX, top: ev.clientY });
                                setActiveId(item._id);
                            }}
                            type="teacher"
                        />
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default Teachers;
