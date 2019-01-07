import React, {Component} from 'react';
import {Button} from 'react-md';
import MaterialTable from 'material-table';

// Import the Stitch components required
import {stitchClient} from "./App";
import {RemoteMongoClient, UserPasswordCredential} from 'mongodb-stitch-browser-sdk';

export default class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            username: ''
        }

        this.onClick = this.onClick.bind(this);
        this.isUnmounted = false;
    }

    // function driver via Stitch Query Anywhere.
    listProductsByUser(username) {

        this.setState({username:username});

        // Start of Stitch use
        // Strictly for example.  Each user would most likely have a different password :)
        console.log("List Products. User selected: " + this.state.username);
        let pass = 'myPassword123';
        let credential = new UserPasswordCredential(username, pass);

        return stitchClient.auth.loginWithCredential(credential).then(user => {
            console.log("User logged in: " + user.id);

            // Initialize Mongo Service Client
            let mongodb = stitchClient.getServiceClient(
                RemoteMongoClient.factory,
                "mongodb-atlas"
            );

            // get a reference to the inventory collection
            let inventoryCollection = mongodb.db("myInventoryDatabase").collection("inventory");

            // query the collection
            return inventoryCollection.find({}, {
                limit: 30,
                sort: {"price": 1}
            }).asArray();
        // End of Stitch use

        }).then(results => {

            if(this.isUnmounted) {
                console.log("component unmounted");
                return;
            }
            this.setState({data: results});

        }).catch(e => {
            console.log("Error with listproducts by user: " + e);
        })
    }

    componentDidMount() {
        if(this.state.data.length === 0) {
            this.setState({
                data : this.listProductsByUser('Joe')
            })
        }
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    onClick(username) {
        this.setState({
            data: this.listProductsByUser(username)
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
                    This page is built using the <a target={"_blank"} href={"https://docs.mongodb.com/stitch/getting-started/configure-rules-based-access-to-mongodb/"}>Query Anywhere</a> functionality of Stitch. {"\n"}
                    Additionally, results are filtered based on the selected User.  {"\n"}
                    This is controlled via <a target={"_blank"} href={"https://docs.mongodb.com/stitch/mongodb/mongodb-rules/"}>Rules</a> in MongoDB Stitch.
                </pre>
                <h2 className="md-cell md-cell--12">Product Listing Page</h2>
                <Button className="md-cell--left" raised primary onClick={() => this.onClick('Joe')}>Products for Joe</Button>
                <Button className="md-cell--left" raised primary onClick={() => this.onClick('Sue')}>Products for Sue</Button>
                <h4 className="md-cell md-cell--12">Displaying data for user: {this.state.username}</h4>
                <MaterialTable
                        columns={[{title: 'Name', field: 'productName'},
                            {title: 'Color', field: 'color'},
                            {title: 'Department', field: 'department'},
                            {title: 'SKU', field: 'sku'},
                            {title: 'Price', field: 'price'},
                            {title: 'Available', field: 'available'}]}
                            data={mtData}
                            title={"Products"}/>

            </div>
        );
    }
}