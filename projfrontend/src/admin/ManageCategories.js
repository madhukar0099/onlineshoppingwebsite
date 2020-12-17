import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getCategories , deleteCategory} from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAutheticated();

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);


  const deleteThisCategories = categoryId => {
    deleteCategory(categoryId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };


  return (
    <Base title="Welcome admin" description="Manage Category here">
      
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>

      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">All categories are below </h2>

          {categories.map((category, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                  <div className="col-4">
                   <h3 className="text-white" key={index}> {category.name} </h3>
                  </div>
                  <div className="col-4">  
                 </div>
                        <div className="col-4">
                            <button
                               onClick={() => {
                              deleteThisCategories(category._id);
                               }}
                              className="btn btn-danger"
                             >
                             Delete
                             </button>
                         </div>
                </div>
             );
           })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
// <div className="row text-center mb-2 ">
/*
<Link
                      className="btn btn-success"
                       to={`/admin/Categories/update/categoryId`}
                       >
                       <span className="">Update</span>
                   </Link>
*/