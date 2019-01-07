import React, {Component} from 'react';
import {Button, TextField} from 'react-md';
import {stitchClient} from "./App";
import MaterialTable from 'material-table';

// import Stitch components
import {UserPasswordCredential} from 'mongodb-stitch-browser-sdk';


export default class ProductSearch extends Component {

    constructor(props) {
        super(props)

        this.state = {
            resultData: []
        };

        this.productNameField = React.createRef();
    }

    // Function using Stitch Functions
    findProductByName(productName) {
        console.log("Search for products by name: " + productName);
        let username = 'Joe';
        let pass = 'myPassword123';
        let credential = new UserPasswordCredential(username, pass);

        return stitchClient.auth.loginWithCredential(credential).then(user => {
            console.log("User logged in: " + user.id);

            return stitchClient.callFunction('searchProducts', [productName]);

        }).then(results => {
            console.log("result: " + JSON.stringify(results));
            this.setState({resultData: results});

        }).catch(e => {
            console.log("Error with listproducts by user: " + e);
        })
    }

    handleSubmit = (e) => {
        console.log("submit");
        e.preventDefault();

        let productNameValue = '';
        if (this.productNameField.current) {
            productNameValue = this.productNameField.current.value;

            //this.setState({resultData:[productNameValue]})
            this.findProductByName(productNameValue);
        }
        console.log("productname: " + productNameValue);
    };

    handleReset = () => {
        console.log("reset");
        this.setState({resultData: []})
    };

    render() {
        const {resultData} = this.state;
        let mtData = [];
        if (resultData.length > 0) {
            mtData = resultData.slice();
        }

        return (
            <div className="md-grid">
                <pre className="md-cell md-cell--12">
                    <h4 className="md-cell md-cell--12">
                        <b>Note: </b>This page is built using <a target={"_blank"} href={"https://docs.mongodb.com/stitch/functions/"}>MongoDB Stitch Functions.</a>  Using the Stitch client {"\n"}
                    it is possible to call functions defined within MongoDB Stitch.
                    </h4>
                </pre>
                <h2 className="md-cell md-cell--12">Product Search Page</h2>
                <form onSubmit={this.handleSubmit}
                      onReset={this.handleReset}>
                    <TextField
                        id="application-title"
                        label="Enter Product Name"
                        ref={this.productNameField}
                        className="md-cell md-cell--12"
                        required
                    />
                    <Button className="md-cell--left" raised primary type="submit">Submit</Button>
                    <Button className="md-cell--left" raised primary type="reset">Reset</Button>
                <MaterialTable
                    columns={[{title: 'Name', field: 'productName'},
                        {title: 'Color', field: 'color'},
                        {title: 'Department', field: 'department'},
                        {title: 'SKU', field: 'sku'},
                        {title: 'Price', field: 'price'},
                        {title: 'Available', field: 'available'}]}
                    data={mtData}
                    title={"Search Results"}/>
                </form>
            </div>
        );
    }
}