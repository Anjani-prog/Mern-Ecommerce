import React from "react";

const CartItem = props => {
  const { cartItem, cartKey } = props;

  const { product, price } = cartItem;
  return (
    <div className=" column is-one-third">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt={product.description}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-info">${product.price}</span>
            </b>
            {/* <div>{product.description}</div> */}
            <small>{`${product.quantity} in cart`}</small>
          </div>
          <div
            className="media-right"
            onClick={() => props.removeFromCart(cartKey)}
          >
            <span className="delete is-large"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
