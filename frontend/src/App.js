import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Register from './components/Register';

import Context from "./Context";
import Loader from "react-loader-spinner";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      visible: false,
      products: []
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");
    this.setState({ visible: true });

    const products = await axios.get('http://localhost:5000/api/product/list-products');
    user = user ? JSON.parse(user) : null;
    cart = cart ? JSON.parse(cart) : {};

    this.setState({ user, products: products.data.products, cart, visible: false });
  }

  register = async (email, password) => {
    this.setState({ visible: true });

    const res = await axios.post(
      'http://localhost:5000/api/user/signup',
      { username: email, password: password },
    ).catch((res) => {
      this.setState({ visible: false });
      return { status: 401, message: 'Unauthorized' }
    })
    if (res.status === 200) {
      this.setState({ visible: false });
      if (res.data.status === true) {
        alert(res.data.message)
        this.routerRef.current.history.push("/login");

        return true;
      } else {
        alert(res.data.message)
        return false;
      }
    }
    else {
      this.setState({ visible: false });
      return false;
    }

  }

  login = async (email, password) => {
    this.setState({ visible: true });
    const res = await axios.post(
      'http://localhost:5000/api/user/login',
      { username: email, password: password },
    ).catch((res) => {
      this.setState({ visible: false });
      return { status: 401, message: 'Unauthorized' }
    })

    if (res.status === 200) {
      if (res.data.status === true) {
        // console.log(jwt_decode(res.data.data.token))
        const { username, _id } = jwt_decode(res.data.data.token)
        const user = {
          _id,
          username,
          token: res.data.data.token,
          accessLevel: username === 'admin@example.com' ? 0 : 1
        }

        this.setState({ user });
        localStorage.setItem("user", JSON.stringify(user));
        alert(res.data.message)
        this.setState({ visible: false });
        return true;
      } else {
        this.setState({ visible: false });
        alert(res.data.message)
        return false;
      }
    } else {
      this.setState({ visible: false });
      return false;
    }
  }

  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };

  addToCart = cartItem => {
    let cart = this.state.cart;
    if (cartItem.product.quantity !== 0) {
      if (cart[cartItem.id]) {
        cart[cartItem.id].amount += cartItem.amount;
      } else {
        cart[cartItem.id] = cartItem;
      }
      if (cart[cartItem.id].amount > cart[cartItem.id].product.quantity) {
        cart[cartItem.id].amount = cart[cartItem.id].product.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      this.setState({ cart });
    }
    else {
      alert('Product is not available')
    }

  };

  removeFromCart = cartItemId => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart, visible: false });
  };

  checkout = async () => {
    this.setState({ visible: true });
    if (!this.state.user) {
      this.setState({ visible: false });
      this.routerRef.current.history.push("/login");
      return;
    }
    const cart = this.state.cart;

    const products = this.state.products.map(p => {
      if (cart[p.name]) {
        p.quantity = cart[p.name].amount;
      }
      return p;
    });
    const user = this.state.user;
    const res = await axios.post(
      `http://localhost:5000/api/cart/checkout`,
      { products: products, user: user },
    )
    if (res.status === 200) {
      if (res.data.status === true) {
        await this.setState({ products: res.data.products });
        await this.clearCart();
        return true;
      } else {
        alert(res.data.message)
        this.setState({ visible: false });
        return false;
      }
    }

    // const products = this.state.products.map(p => {
    //   if (cart[p.name]) {
    //     p.quantity = p.quantity - cart[p.name].amount;

    //     axios.put(
    //       `http://localhost:5000/products/${p.id}`,
    //       { ...p },
    //     )
    //   }
    //   return p;
    // });


  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          register: this.register,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout
        }}
      >
        <Router ref={this.routerRef}>
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              visible={this.state.visible}
              timeout={3000}
            />
          </div>
          <div className="App">
            <nav class="navbar">
              <div class="container">
                <div class="navbar-brand">
                  <a class="navbar-item">
                  </a>
                  <span class="navbar-burger" data-target="navbarMenuHeroB">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>

              </div>
              <div className={`navbar-menu ${this.state.showMenu ? "is-active" : ""
                }`}>
                <Link to="/products" className="navbar-item">
                  Products
                </Link>
                {this.state.user && this.state.user.accessLevel < 1 && (
                  <Link to="/add-product" className="navbar-item">
                    Add Product
                  </Link>
                )}
                <Link to="/cart" className="navbar-item">
                  Cart
                  <span
                    className="tag is-info"
                    style={{ marginLeft: "5px" }}
                  >
                    {Object.keys(this.state.cart).length}
                  </span>
                </Link>

                {!this.state.user ? (
                  <Link to="/login" className="navbar-item">
                    Login
                  </Link>

                ) : (
                  <Link to="/" onClick={this.logout} className="navbar-item">
                    Logout
                  </Link>
                )}
                <Link to="/register" className="navbar-item">
                  Register
                  </Link>
              </div>
            </nav>

            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductList} />
              <Route exact path="/register" component={Register} />

            </Switch>
          </div>
        </Router >
      </Context.Provider >
    );
  }
}
