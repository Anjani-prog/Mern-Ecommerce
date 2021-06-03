import React, { Component } from "react";
import withContext from "../withContext";
import { Switch, Route, Link, Redirect, BrowserRouter as Router } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.routerRef = React.createRef();
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  login = (e) => {
    e.preventDefault();

    const { username, password } = this.state;
    if (!username || !password) {
      return this.setState({ error: "Fill all fields!" });
    }
    this.props.context.login(username, password)
      .then((loggedIn) => {
        if (!loggedIn) {
          this.setState({ error: "Invalid Credentails" });
        }
      })
  };




  render() {
    return !this.props.context.user ? (
      <Router ref={this.routerRef}>
        <div>
          <div className="hero is-info ">
            <div className="hero-body">
              <h4 className="title">Login</h4>
            </div>
          </div>
          <br />
          <br />
          <form onSubmit={this.login}>
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
                {this.state.error && (
                  <div className="has-text-danger">{this.state.error}</div>
                )}
                <div className="field is-clearfix  is-vcentered is-half ">
                  <button
                    style={{ margin: "10px" }}
                    className="button column  is-info is-outlined is-pulled-right"
                  >
                    Submit
                </button>


                </div>
              </div>
            </div>
          </form>
        </div>
      </Router >
    ) : (
      <Redirect to="/products" />
    );
  }
}

export default withContext(Login);
