import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ResourceNotFound from './pages/ResourceNotFound';
import CartContext from './context/CartContext';
import { useCartContext } from './hooks/useCartContext';

const App = () => {
    const context = useCartContext();
    return (
        <Router>
            <CartContext.Provider value={context}>
                <NavigationBar />
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/products" />} />
                    <Route exact path="/products" component={Products} />
                    <Route exact path="/products/:id" component={ProductDetails} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/checkout" component={Checkout} />
                    <Route exact path="/notfound" component={ResourceNotFound} />
                    <Route path="*" render={() => <Redirect to="/notfound" />} />
                </Switch>
            </CartContext.Provider>
        </Router>
    );
};

export default App;
