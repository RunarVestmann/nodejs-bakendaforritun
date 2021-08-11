import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import NotFound from './pages/NotFound';
import CourseDetails from './pages/CourseDetails';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Courses from './pages/Courses';
import PersonDetails from './pages/PersonDetails';

const App = () => {
    return (
        <Router>
            <NavigationBar />
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/students" />} />
                <Route exact path="/students" component={Students} />
                <Route exact path="/students/:id">
                    <PersonDetails type="student" />
                </Route>
                <Route exact path="/teachers" component={Teachers} />
                <Route exact path="/teachers/:id">
                    <PersonDetails type="teacher" />
                </Route>
                <Route exact path="/courses" component={Courses} />
                <Route exact path="/courses/:id" component={CourseDetails} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
