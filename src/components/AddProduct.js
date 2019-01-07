import React, {Component} from 'react';
import {Button, TextField, SelectField, Snackbar } from "react-md";

const COLORS = ['Red', 'Blue', 'Green', 'Orange', 'Black'];
const DEPARTMENTS = ['Garden', 'Electronics', 'Computers', 'Industrial', 'Shoes', 'Health', 'Misc'];

const mdbStitchWebhook = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/mystitchapplication-fusnv/service/postNewProduct/incoming_webhook/postNewProductWebhook?secret=mySecret';

export default class AddProduct extends Component {

    constructor(props) {
        super(props)

        this.state = {
            toasts: []
        };

        this.productNameField = React.createRef();
        this.priceField = React.createRef();
        this.departmentField = React.createRef();
        this.numberAvailableField = React.createRef();
        this.colorField = React.createRef();
        this.skuField = React.createRef();
    }

    postNewProduct(productData) {
        console.log("Insert new product: " + JSON.stringify(productData));

        fetch( mdbStitchWebhook,{
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(productData)
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result: " + json);

                if(!this.state.toasts.length) {
                    const toasts = this.state.toasts.slice();
                    toasts.push({
                        text: json,
                        action: "Successful!!",
                    });

                    this.setState({toasts});
                }
            })
            .catch(function(ex) {
                console.log('Error on post to new product');
            })
    }

    handleDismiss = () => {
        const [, ...toasts] = this.state.toasts;
        this.setState({toasts});
    }

    handleSubmit = (e) => {
        console.log("submit");
        e.preventDefault();

        let productNameValue;
        let priceValue;
        let deptValue;
        let numAvailValue;
        let colorValue;
        let skuValue;

        let newProduct;

        if (this.productNameField.current &&
            this.priceField.current &&
            this.departmentField.current &&
            this.numberAvailableField.current &&
            this.colorField.current &&
            this.skuField.current) {

            productNameValue = this.productNameField.current.value;
            priceValue = this.priceField.current.value;
            deptValue = this.departmentField.current.value;
            numAvailValue = this.numberAvailableField.current.value;
            colorValue = this.colorField.current.value;
            skuValue = this.skuField.current.value;

            newProduct = {
                color : colorValue,
                department : deptValue,
                productName : productNameValue,
                price : priceValue,
                available : numAvailValue,
                sku : skuValue
            }

            this.postNewProduct(newProduct);
        }
    };

    handleReset = () => {
        console.log("reset");
    };

    render() {

        const{ toasts } = this.state;

        return (

            <div className="md-grid">
                <pre className="md-cell md-cell--12">
                    This page is using the <a target={"_blank"} href={"https://docs.mongodb.com/stitch/services/create-a-service-webhook/index.html"}>Webhook</a> feature of MongoDB Stitch.  This enables the ability to {"\n"}
                    define a REST-enabled endpoint that can accept HTTP GET and POST requests.  This page {"\n"}
                    is posting the contents of a new product definition to an endpoint that is backed by an {"\n"}
                    associated function which handles the insert.
                </pre>
                <h2 className="md-cell md-cell--12">Add Product</h2>
                <form onSubmit={this.handleSubmit}
                      onReset={this.handleReset}>
                    <TextField
                        id="productName"
                        label="Enter Product Name"
                        ref={this.productNameField}
                        className="md-cell md-cell--12"
                        required
                    />
                    <TextField
                        id="sku"
                        label="Enter Product SKU"
                        ref={this.skuField}
                        className="md-cell md-cell--12"
                        required
                    />
                    <SelectField
                        id="color"
                        label="Color"
                        className="md-cell md-cell--12"
                        menuItems={COLORS}
                        required
                        ref={this.colorField}
                        defaultValue='Red'
                    />
                    <TextField
                        id="price"
                        label="Price"
                        type="number"
                        defaultValue={10}
                        step={10}
                        min={10}
                        className="md-cell md-cell--12"
                        required
                        ref={this.priceField}
                    />
                    <SelectField
                        id="department"
                        label="Department"
                        className="md-cell md-cell--12"
                        menuItems={DEPARTMENTS}
                        required
                        ref={this.departmentField}
                        defaultValue='Garden'
                    />
                    <TextField
                        id="available"
                        label="Number Available"
                        type="number"
                        defaultValue={10}
                        step={10}
                        min={10}
                        className="md-cell md-cell--12"
                        required
                        ref={this.numberAvailableField}
                    />
                    <Button className="md-cell" raised primary type="submit">Submit</Button>
                    <Button className="md-cell" raised primary type="reset">Reset</Button>
                    <Snackbar id="toasts" toasts={toasts} onDismiss={this.handleDismiss} autohide={false}/>
                </form>
            </div>
        );
    }
}