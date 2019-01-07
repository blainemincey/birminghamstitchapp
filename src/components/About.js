import React, {Component} from 'react';
import {Avatar} from "react-md";
import img from "../styles/mongodb-leaf.png";

export default class About extends Component {
    render() {
        return (
            <div className="md-grid">

                <h2 className="md-cell md-cell--12">
                    <Avatar src={img} role="presentation"/>
                    About This Application
                    <Avatar src={img} role="presentation"/></h2>

                <pre className="md-cell md-cell--12">
                    This application was built using several different technologies.  Following are the resources used {"\n"}
                    in constructing it: {"\n\n\n"}
                    <a target={"_blank"} href={"https://mystitchapplication-fusnv.mongodbstitch.com"}>Completed MongoDB Stitch Application (Hosted on MongoDB Stitch)</a>{"\n\n"}
                    Backend{"\n"}
                    <a target={"_blank"} href={"https://www.mongodb.com/cloud/atlas"}>MongoDB Atlas (Database as a Service)</a>{"\n"}
                    <a target={"_blank"} href={"https://docs.mongodb.com/stitch/"}>MongoDB Stitch Serverless Platform</a>{"\n"}
                    NOTE:  It is <b>FREE</b> to signup for MongoDB Atlas!{"\n\n"}
                    Frontend{"\n"}
                    <a target={"_blank"} href={"https://reactjs.org/"}>React</a>{"\n"}
                    <a target={"_blank"} href={"https://react-md.mlaursen.com/"}>react-md (Material Design for React)</a>{"\n"}
                    <a target={"_blank"} href={"https://react-md.mlaursen.com/"}>material-table (DataTable based on the material-ui table component)</a>{"\n\n"}
                    Source Code{"\n"}
                    <a target={"_blank"} href={"github"}>GitHub Source Code for React Frontend</a>{"\n"}
                    <a target={"_blank"} href={"github"}>GitHub Source Code for MongoDB Stitch Application</a>{"\n\n"}

                    Questions?  Please reach out to your local MongoDB Solutions Architect or Blaine Mincey - <a href={"mailto:blaine.mincey@mongodb.com"}>blaine.mincey@mongodb.com</a>

                </pre>

            </div>
        );
    }
}