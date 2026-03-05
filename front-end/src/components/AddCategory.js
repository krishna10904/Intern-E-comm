import React, { useState } from "react";

const AddCategory = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const addCategory = async () => {

    if (!name) {
      setMessage("Enter category name");
      return;
    }

    let result = await fetch("https://intern-e-comm-1.onrender.com/add-category", {
      method: "POST",
      body: JSON.stringify({
        category_name: name,
        description: description
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    result = await result.json();

    if (result) {
      setMessage("Category added successfully");
      setName("");
      setDescription("");
    }
  };

  return (
    <div className="product">
      <h1>Add Category</h1>

      <input
        type="text"
        className="inputBox"
        placeholder="Category Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="Description"
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
      />

      <button className="appButton" onClick={addCategory}>
        Add Category
      </button>

      <p>{message}</p>
    </div>
  );
};

export default AddCategory;