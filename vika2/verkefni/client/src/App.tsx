import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ItemDetails from './pages/ItemDetails';
import Items from './pages/Items';
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <Router>
            <NavigationBar />
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/items" />} />
                <Route exact path="/items" component={Items} />
                <Route exact path="/items/:id" component={ItemDetails} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
