import { Button, Grid, makeStyles } from '@material-ui/core';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthorDialog from '../components/AuthorDialog';
import AuthorThumbnail from '../components/AuthorThumbnail';
import ContextMenu from '../components/ContextMenu';
import { AUTHORS_URL } from '../services/urls';

const useStyles = makeStyles({
    root: {
        width: '80%',
        margin: '0 auto',
        marginTop: '2rem',
        marginBottom: '2rem',
    },
});

export const Authors = () => {
    const classes = useStyles();
    const [authors, setAuthors] = useState<AuthorEntity[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ left: 0, top: 0 });
    const [activeId, setActiveId] = useState('');
    const editAuthor = useRef<AuthorEntity | null | undefined>(null);
    const [editing, setEditing] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const controller = new AbortController();
        const getAllAuthors = async (controller: AbortController) => {
            try {
                const response = await fetch(AUTHORS_URL, { signal: controller.signal });
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                if (error.name !== 'AbortError') console.log(error);
            }
        };
        getAllAuthors(controller);
        return () => controller.abort();
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
                    const data = authors.find((b) => b._id === id);
                    editAuthor.current = data;
                    setEditing(true);
                }}
                onDeleteClicked={(id) => {
                    fetch(`${AUTHORS_URL}/${id}`, {
                        method: 'DELETE',
                    }).then(() => history.go(0));
                }}
            />
            <AuthorDialog
                open={menuOpen}
                onClose={() => {
                    setMenuOpen(false);
                    setEditing(false);
                    editAuthor.current = null;
                }}
                edit={editing}
                initialState={editAuthor.current ? editAuthor.current : undefined}
                authors={authors}
            />

            <div className={classes.root}>
                <Button onClick={() => setMenuOpen(true)}>+ Add author</Button>
                <Grid container={true} justifyContent="flex-start" alignItems="center">
                    {authors.map((a) => (
                        <AuthorThumbnail
                            key={a._id}
                            {...a}
                            onContextMenu={(ev) => {
                                ev.preventDefault();
                                setContextMenuOpen(true);
                                setContextMenuPosition({ left: ev.clientX, top: ev.clientY });
                                setActiveId(a._id);
                            }}
                        />
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default Authors;
