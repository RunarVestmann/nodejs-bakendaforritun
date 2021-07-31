import { Button, Grid, makeStyles } from '@material-ui/core';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ItemDialog } from '../components/ItemDialog';
import ItemThumbnail from '../components/ItemThumbnail';
import ContextMenu from '../components/ContextMenu';
import { ITEMS_URL } from '../services/urls';

const useStyles = makeStyles({
    root: {
        width: '80%',
        margin: '0 auto',
        marginTop: '2rem',
        marginBottom: '2rem',
    },
});

export const Items = () => {
    const classes = useStyles();
    const [items, setItems] = useState<Item[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ left: 0, top: 0 });
    const [activeId, setActiveId] = useState('');
    const editItem = useRef<Item | null | undefined>(null);
    const [editing, setEditing] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const getAllItems = async () => {
            const response = await fetch(ITEMS_URL);
            setItems(await response.json());
        };
        getAllItems();
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
                    const data = items.find((b) => b._id === id);
                    editItem.current = data;
                    setEditing(true);
                }}
                onDeleteClicked={(id) => {
                    fetch(`${ITEMS_URL}/${id}`, {
                        method: 'DELETE',
                    }).then(() => history.go(0));
                }}
            />
            <ItemDialog
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
                <Button onClick={() => setMenuOpen(true)}>+ Add item</Button>
                <Grid container={true} justifyContent="flex-start" alignItems="center">
                    {items.map((item) => (
                        <ItemThumbnail
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

export default Items;
