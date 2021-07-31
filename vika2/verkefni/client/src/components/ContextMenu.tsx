import { Menu, MenuItem } from '@material-ui/core';
import React from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
    position: { left: number; top: number };
    onEditClicked: (id: string) => void;
    onDeleteClicked: (id: string) => void;
    activeId: string;
}

const ContextMenu: React.FC<Props> = ({ open, onClose, position, activeId, onEditClicked, onDeleteClicked }) => {
    return (
        <Menu
            anchorReference="anchorPosition"
            anchorPosition={position}
            onClick={onClose}
            open={open}
            onClose={onClose}
        >
            <MenuItem onClick={() => onEditClicked(activeId)}>Edit</MenuItem>
            <MenuItem onClick={() => onDeleteClicked(activeId)}>Delete</MenuItem>
        </Menu>
    );
};

export default ContextMenu;
