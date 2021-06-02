import React from "react";

const ProductItem = props => {
  const { product } = props;
  return (
    <div className=" column is-one-third">
      <div className="box">
        <div className="content">
          <div className="media">
            <figure className="image is-fullwidth">
              <img
                class="is-rounded"
                src={Boolean(product.shortDesc) ? "https://bulma.io/images/placeholders/128x128.png" : "https://bulma.io/images/placeholders/128x128.png"}
                alt={product.shortDesc}
              />
            </figure>
          </div>
          <div className="">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-warning is-light">${product.price}</span>
            </b>
            {/* <div>{product.shortDesc}</div> */}
            {product.stock > 0 ? (
              <small>{product.stock + " Available"}</small>
            ) : (
              <small className="has-text-danger">Out Of Stock</small>
            )}
          </div>
          <div className="is-clearfix">
            <button
              className="button is-small is-fullwidth  is-info  is-pulled-right"
              onClick={() =>
                props.addToCart({
                  id: product.name,
                  product,
                  amount: 1
                })
              }
            >
              Add to Cart
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
