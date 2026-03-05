import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoryList = () => {

  const [categories,setCategories] = useState([]);

  useEffect(()=>{
    getCategories();
  },[]);

  const getCategories = async ()=>{

    let result = await fetch("http://localhost:5000/categories");
    result = await result.json();

    setCategories(result);
  }

  const deactivateCategory = async(id)=>{

    await fetch(`http://localhost:5000/category/deactivate/${id}`,{
      method:"PUT"
    });

    getCategories();
  }

  return(
    <div className="product-list">

      <h1>Categories</h1>

      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Description</li>
        <li>Operations</li>
      </ul>

      {
        categories.map((item,index)=>

        <ul key={item._id}>
          <li>{index+1}</li>
          <li>{item.category_name}</li>
          <li>{item.description}</li>

          <li>
            <button onClick={()=>deactivateCategory(item._id)}>
              Delete
            </button>

            <Link to={"/update-category/"+item._id}>
              Update
            </Link>

          </li>
        </ul>

        )
      }

    </div>
  )
}

export default CategoryList;