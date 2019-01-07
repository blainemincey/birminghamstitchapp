import React, {Component} from 'react';
import {NavigationDrawer} from 'react-md';
import NavLink from './NavLink';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Products from './Products';
import ProductSearch from './ProductSearch.js';
import AddProduct from './AddProduct';
import OrderProducts from './OrderProducts';
import img from '../styles/mongoDBStitch.jpg';

// Import Stitch from the browser SDK
import { Stitch } from 'mongodb-stitch-browser-sdk';

// Initialize Stitch - appId is unique
let appId = 'mystitchapplication-fusnv';
Stitch.initializeDefaultAppClient(appId);
export const stitchClient = Stitch.defaultAppClient;

const navItems = [{
    exact: true,
    label: 'Home',
    icon: 'home',
    to: '/'
    }, {
    label: 'Products',
    icon: 'shopping_cart',
    to: '/products'
    },{
    label: 'Product Search',
    icon: 'search',
    to:'/productSearch'
    }, {
    label: 'Add Product',
    icon: 'add_box',
    to: '/addProduct'
    }, {
    label: 'Order Products',
    icon: 'autorenew',
    to: '/orderProducts'
    }, {
    label: 'About',
    icon: 'info',
    to: '/about'
}];

class App extends Component {
    render() {
        return (
            <Route
                render={({location}) => (
                    <NavigationDrawer
                        drawerTitle="Inventory Application"
                        drawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
                        toolbarTitle="Brewing Up Innovation with MongoDB"
                        navItems={navItems.map(props => <NavLink {...props} key={props.to}/>)}>

                        <Switch key={location.key}>
                            <Route exact path="/" location={location} component={Home}/>
                            <Route path="/products" location={location} component={Products}/>
                            <Route path="/productSearch" location={location} component={ProductSearch}/>
                            <Route path="/addProduct" location={location} component={AddProduct}/>
                            <Route path="/orderProducts" location={location} component={OrderProducts}/>
                            <Route path="/about" location={location} component={About} />
                        </Switch>

                        <div className="footer">
                            <img alt="MongoDBStitch" src={img} className="img-footer"/>
                        </div>

                    </NavigationDrawer>
                )}
            />
        );
    }
}

export default App;
