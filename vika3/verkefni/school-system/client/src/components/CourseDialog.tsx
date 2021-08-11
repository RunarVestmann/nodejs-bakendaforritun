import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ListItemIcon,
    Menu,
    MenuItem,
    TextField,
    Typography,
} from '@material-ui/core';
import React from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { COURSES_URL, STUDENTS_URL, TEACHERS_URL } from '../services/urls';

interface Props {
    open: boolean;
    onClose: () => void;
    edit: boolean;
    initialState?: Omit<CourseEntity, '_id'> & { _id?: string };
}

const TEACHERS = 0;
const TEACHING_ASSISTANTS = 1;
const STUDENTS = 2;

export const CourseDialog: React.FC<Props> = ({
    edit,
    open,
    onClose,
    initialState = {
        description: '',
        name: '',
        endDate: '',
        startDate: '',
        students: [],
        teachers: [],
        teachingAssistants: [],
    },
}) => {
    const [state, setState] = useState<Omit<CourseEntity, '_id'> & { _id?: string }>(initialState);
    const isSubmitting = useRef(false);
    const teacherButtonRef = useRef<HTMLButtonElement>(null);
    const teachingAssistantsButtonRef = useRef<HTMLButtonElement>(null);
    const studentButtonRef = useRef<HTMLButtonElement>(null);
    const history = useHistory();

    const [menusOpen, setMenusOpen] = useState([false, false, false]);

    const [teachers, setTeachers] = useState<(TeacherEntity & { enrolled: boolean })[]>([]);
    const [teachingAssistants, setTeachingAssistants] = useState<(TeacherEntity & { enrolled: boolean })[]>([]);
    const [students, setStudents] = useState<(StudentEntity & { enrolled: boolean })[]>([]);

    useEffect(() => {
        if (initialState && edit) setState(initialState);
    }, [initialState, edit]);

    useEffect(() => {
        const controller = new AbortController();
        const setup = async (controller: AbortController) => {
            try {
                const [teacherResponse, studentResponse] = await Promise.all([
                    fetch(TEACHERS_URL, { signal: controller.signal }),
                    fetch(STUDENTS_URL, { signal: controller.signal }),
                ]);
                const ts = (await teacherResponse.json()).map((t: TeacherEntity) => ({
                    ...t,
                    enrolled: state.teachers.includes(t._id),
                }));
                setTeachers(ts);
                setTeachingAssistants(ts);
                const ss = (await studentResponse.json()).map((s: StudentEntity) => ({
                    ...s,
                    enrolled: state.students.includes(s._id),
                }));
                setStudents(ss);
            } catch (error) {
                if (error.name !== 'AbortError') console.log(error);
            }
        };
        setup(controller);
        return () => controller.abort();
        // eslint-disable-next-line
    }, []);

    const handleSelection = (ev: { name: string; value: string }) => {
        if (ev.name === 'teachers') {
            const update = teachers.map((t) => {
                if (t._id === ev.value) return { ...t, enrolled: !t.enrolled };
                return t;
            });
            setTeachers(update);
            setState((state) => ({ ...state, teachers: update.filter((t) => t.enrolled).map((t) => t._id) }));
        } else if (ev.name === 'teachingAssistants') {
            const update = teachingAssistants.map((t) => {
                if (t._id === ev.value) return { ...t, enrolled: !t.enrolled };
                return t;
            });
            setTeachingAssistants(update);
            setState((state) => ({ ...state, teachingAssistants: update.filter((t) => t.enrolled).map((t) => t._id) }));
        } else if (ev.name === 'students') {
            const update = students.map((t) => {
                if (t._id === ev.value) return { ...t, enrolled: !t.enrolled };
                return t;
            });
            setStudents(update);
            setState((state) => ({ ...state, students: update.filter((t) => t.enrolled).map((t) => t._id) }));
        }
    };

    const handleChange = (ev: any) => setState((state) => ({ ...state, [ev.target.name]: ev.target.value }));

    const handleSubmit = async () => {
        if (isSubmitting.current) return;
        isSubmitting.current = true;
        const response = await fetch(edit ? `${COURSES_URL}/${initialState._id as string}` : `${COURSES_URL}`, {
            method: edit ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(state),
        });
        if (!response.ok) return (isSubmitting.current = false);
        history.go(0);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{edit ? 'Edit course' : 'Create course'}</DialogTitle>
            <DialogContent>
                <TextField
                    value={state.name}
                    onChange={handleChange}
                    autoFocus
                    name="name"
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                />
                <TextField
                    value={state.description}
                    onChange={handleChange}
                    margin="dense"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                />
                <TextField
                    value={state.startDate.split('T')[0]}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange}
                    margin="dense"
                    name="startDate"
                    label="Start date"
                    type="date"
                    fullWidth
                />
                <TextField
                    value={state.endDate.split('T')[0]}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleChange}
                    margin="dense"
                    name="endDate"
                    label="End date"
                    type="date"
                    fullWidth
                />
                <Button ref={teacherButtonRef} onClick={() => setMenusOpen(menusOpen.map((m, i) => i === TEACHERS))}>
                    Teachers
                </Button>
                <Menu
                    open={menusOpen[TEACHERS]}
                    onClose={() => setMenusOpen(menusOpen.map((m, i) => (i === TEACHERS ? false : m)))}
                    anchorEl={teacherButtonRef.current}
                    anchorReference="anchorEl"
                >
                    {teachers.map((t) => (
                        <MenuItem
                            onClick={() => handleSelection({ name: 'teachers', value: t._id })}
                            key={t._id}
                            value={t._id}
                        >
                            <ListItemIcon>
                                {t.enrolled ? (
                                    <CheckBoxIcon fontSize="small" />
                                ) : (
                                    <CheckBoxOutlineBlankIcon fontSize="small" />
                                )}
                            </ListItemIcon>
                            <Typography variant="inherit" noWrap={true}>
                                {t.name}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
                <Button
                    ref={teachingAssistantsButtonRef}
                    onClick={() => setMenusOpen(menusOpen.map((m, i) => i === TEACHING_ASSISTANTS))}
                >
                    Teaching assistants
                </Button>
                <Menu
                    open={menusOpen[TEACHING_ASSISTANTS]}
                    onClose={() => setMenusOpen(menusOpen.map((m, i) => (i === TEACHING_ASSISTANTS ? false : m)))}
                    anchorEl={teachingAssistantsButtonRef.current}
                    anchorReference="anchorEl"
                >
                    {teachingAssistants.map((t) => (
                        <MenuItem
                            onClick={() => handleSelection({ name: 'teachingAssistants', value: t._id })}
                            key={t._id}
                            value={t._id}
                        >
                            {t.enrolled ? (
                                <CheckBoxIcon fontSize="small" />
                            ) : (
                                <CheckBoxOutlineBlankIcon fontSize="small" />
                            )}
                            <Typography variant="inherit" noWrap={true}>
                                {t.name}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
                <Button ref={studentButtonRef} onClick={() => setMenusOpen(menusOpen.map((m, i) => i === STUDENTS))}>
                    Students
                </Button>
                <Menu
                    open={menusOpen[STUDENTS]}
                    onClose={() => setMenusOpen(menusOpen.map((m, i) => (i === STUDENTS ? false : m)))}
                    anchorEl={studentButtonRef.current}
                    anchorReference="anchorEl"
                >
                    {students.map((t) => (
                        <MenuItem
                            onClick={() => handleSelection({ name: 'students', value: t._id })}
                            key={t._id}
                            value={t._id}
                        >
                            {t.enrolled ? (
                                <CheckBoxIcon fontSize="small" />
                            ) : (
                                <CheckBoxOutlineBlankIcon fontSize="small" />
                            )}
                            <Typography variant="inherit" noWrap={true}>
                                {t.name}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CourseDialog;
