import React from 'react';

const AddProduct = () => {

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const addProduct = async () => {

        if (!name || !price || !company || !category) {
            setError(true);
            setSuccess(false);
            return;
        }

        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?._id;

        try {
            let result = await fetch("https://intern-e-comm1.onrender.com/add-product", {
                method: "POST",
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            result = await result.json();

            if (result) {
                setSuccess(true);
                setError(false);

                // Clear fields
                setName('');
                setPrice('');
                setCategory('');
                setCompany('');

                // Hide success message after 3 sec
                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            }

        } catch (err) {
            console.log("Error adding product:", err);
        }
    }

    return (
        <div className='product'>
            <h1>Add Product</h1>

            {success && (
                <span style={{ color: "green", display: "block", marginBottom: "10px" }}>
                    ✅ Product Added Successfully!
                </span>
            )}

            <input
                type="text"
                placeholder='Enter product name'
                className='inputBox'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <input
                type="text"
                placeholder='Enter product price'
                className='inputBox'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <input
                type="text"
                placeholder='Enter product category'
                className='inputBox'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <input
                type="text"
                placeholder='Enter product company'
                className='inputBox'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}

            <button onClick={addProduct} className='appButton'>
                Add Product
            </button>
        </div>
    );
}

export default AddProduct;