import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCategory = () => {

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    getCategoryDetails();
  },[]);

  const getCategoryDetails = async ()=>{

    let result = await fetch(
      `http://localhost:5000/category/${params.id}`
    );

    result = await result.json();

    setName(result.category_name);
    setDescription(result.description);
  }

  const updateCategory = async ()=>{

    await fetch(
      `http://localhost:5000/category/${params.id}`,
      {
        method:"PUT",
        body:JSON.stringify({
          category_name:name,
          description:description
        }),
        headers:{
          "Content-Type":"application/json"
        }
      }
    );

    navigate("/categories");
  }

  return(

    <div className="product">

      <h1>Update Category</h1>

      <input
      className="inputBox"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />

      <input
      className="inputBox"
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      />

      <button className="appButton" onClick={updateCategory}>
        Update
      </button>

    </div>

  )
}

export default UpdateCategory;