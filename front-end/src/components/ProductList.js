import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./ProductList.css";

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const addToCart = async (productId) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;

        if (!userId) {
            alert("Please login first");
            return;
        }

        let result = await fetch("http://localhost:5000/cart", {
            method: "POST",
            body: JSON.stringify({ userId, productId }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        result = await result.json();

        if (result) {
            alert("🛒 Product added to cart!");
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    }

    return (
        <div className="product-container">

            <h1 className="product-title">Product List</h1>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search Product"
                    onChange={searchHandle}
                />
            </div>

            <div className="table-header">
                <div>S. No.</div>
                <div>Name</div>
                <div>Price</div>
                <div>Category</div>
                <div>Operation</div>
            </div>

            {
                products.length > 0 ?
                    products.map((item, index) => (
                        <div key={item._id} className="table-row">
                            <div>{index + 1}</div>
                            <div>{item.name}</div>
                            <div>₹ {item.price}</div>
                            <div>{item.category}</div>
                            <div className="action-buttons">

                                {/* ADD TO CART BUTTON */}
                                <button
                                    className="cart-btn"
                                    onClick={() => addToCart(item._id)}
                                >
                                    Add To Cart
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => deleteProduct(item._id)}
                                >
                                    Delete
                                </button>

                                <Link
                                    className="update-btn"
                                    to={"/update/" + item._id}
                                >
                                    Update
                                </Link>

                            </div>
                        </div>
                    ))
                    :
                    <h2 className="no-result">No Result Found</h2>
            }

        </div>
    )
}

export default ProductList;