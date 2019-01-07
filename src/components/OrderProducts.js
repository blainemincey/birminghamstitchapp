import React, {Component} from 'react';
import {Button} from 'react-md';
import MaterialTable from 'material-table';

// Import the Stitch components required
import {stitchClient} from "./App";
import {RemoteMongoClient, UserPasswordCredential} from 'mongodb-stitch-browser-sdk';

export default class OrderProducts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        this.onClick = this.onClick.bind(this);
        this.isUnmounted = false;
    }

    // function driver via Stitch Query Anywhere.
    listProductsToOrder() {

        // Start of Stitch use
        // Strictly for example.
        let username = 'Joe';
        let pass = 'myPassword123';
        let credential = new UserPasswordCredential(username, pass);

        return stitchClient.auth.loginWithCredential(credential).then(user => {
            console.log("User logged in: " + user.id);

            // Initialize Mongo Service Client
            let mongodb = stitchClient.getServiceClient(
                RemoteMongoClient.factory,
                "mongodb-atlas"
            );

            // get a reference to the order new inventory collection
            let orderNewInventoryCollection = mongodb.db("myInventoryDatabase").collection("orderNewInventory");

            // query the collection
            return orderNewInventoryCollection.find({}, {
            }).asArray();
            // End of Stitch use

        }).then(results => {

            if(this.isUnmounted) {
                console.log("component unmounted");
                return;
            }

            this.setState({data: results});

        }).catch(e => {
            console.log("Error with list products to order: " + e);
        })
    }

    componentDidMount() {
        if(this.state.data.length === 0) {
            this.setState({
                data : this.listProductsToOrder()
            })
        }
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    onClick() {
        this.setState({
            data: this.listProductsToOrder()
        })
    }

    render() {

        const {data} = this.state;
        let mtData = [];
        if(data.length > 0) {
            mtData = data.slice();
        }

        return (
            <div className="md-grid">
                <pre className="md-cell md-cell--12">
                    <h4 className="md-cell md-cell--12">
                    <b>Note: </b>This page is built using the <a target={"_blank"} href={"https://docs.mongodb.com/stitch/getting-started/configure-rules-based-access-to-mongodb/"}>Query Anywhere</a> functionality of Stitch. {"\n"}
                        For this example, if a new product is added with 0 available or if a product is updated using MongoDB Compass to having {"\n"}
                        0 available, a <a target={"_blank"} href={"https://docs.mongodb.com/stitch/triggers/"}>Stitch Trigger</a> is fired to insert a document into a new collection.
                    </h4>
                </pre>
                <h2 className="md-cell md-cell--12">Products To Order</h2>
                <Button className="md-cell md-cell--2" raised primary onClick={() => this.onClick()}>Refresh</Button>
                <div style={{width:'100%'}}>
                <MaterialTable
                    columns={[{title: 'Product ID', field: 'productId'},
                        {title: 'Name', field: 'productName'},
                        {title: 'Currently Available', field: 'currentAvailable'},
                        {title: 'Date', field: 'date'}]}
                    data={mtData}
                    title={"Results"}/>
                </div>

            </div>
        );
    }
}