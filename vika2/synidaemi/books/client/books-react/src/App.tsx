import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import AuthorDetails from './pages/AuthorDetails';
import Authors from './pages/Authors';
import BookDetails from './pages/BookDetails';
import Books from './pages/Books';
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <Router>
            <NavigationBar />
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/books" />} />
                <Route exact path="/books" component={Books} />
                <Route exact path="/books/:id" component={BookDetails} />
                <Route exact path="/authors" component={Authors} />
                <Route exact path="/authors/:id" component={AuthorDetails} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
