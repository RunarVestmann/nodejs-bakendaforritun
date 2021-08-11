import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    navLink: {
        color: 'inherit',
        textDecoration: 'none',
        fontSize: '3rem',
        marginRight: '3rem',
    },
    activeNavLink: {
        borderBottom: '3px solid',
    },
});

export const NavigationBar = () => {
    const classes = useStyles();
    return (
        <AppBar color="default" position="static">
            <Toolbar>
                <NavLink className={classes.navLink} activeClassName={classes.activeNavLink} to="/students">
                    Students
                </NavLink>
                <NavLink className={classes.navLink} activeClassName={classes.activeNavLink} to="/teachers">
                    Teachers
                </NavLink>
                <NavLink className={classes.navLink} activeClassName={classes.activeNavLink} to="/courses">
                    Courses
                </NavLink>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;
