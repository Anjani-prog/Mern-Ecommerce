import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            cpassword: ""
        };
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

    register = (e) => {
        e.preventDefault();

        const { username, password, cpassword } = this.state;
        if (!username || !password || !cpassword) {
            return this.setState({ error: "Fill all fields!" });
        }
        else if (password !== cpassword) {
            return this.setState({ error: "password and confirm password not matches!" });
        }
        this.props.context.register(username, password)
            .then((loggedIn) => {
                if (!loggedIn) {
                    this.setState({ error: "Invalid Credentails" });
                }
            })
    };

    render() {
        return !this.props.context.user ? (
            <>
                <div className="hero is-info ">
                    <div className="hero-body">
                        <h4 className="title">Register</h4>
                    </div>
                </div>
                <br />
                <br />
                <form onSubmit={this.register}>
                    <div className="columns is-mobile is-centered">
                        <div className="column is-one-third">
                            <div className="field">
                                <label className="label">Email: </label>
                                <input
                                    className="input"
                                    type="email"
                                    name="username"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="field">
                                <label className="label">Password: </label>
                                <input
                                    className="input"
                                    type="password"
                                    name="password"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="field">
                                <label className="label">Confirm Password: </label>
                                <input
                                    className="input"
                                    type="password"
                                    name="cpassword"
                                    onChange={this.handleChange}
                                />
                            </div>
                            {this.state.error && (
                                <div className="has-text-danger">{this.state.error}</div>
                            )}
                            <div className="field is-clearfix">
                                <button
                                    className="button is-info is-outlined is-pulled-right"
                                >
                                    Submit
                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        ) : (
            <Redirect to="/login" />
        );
    }
}

export default withContext(Register);
