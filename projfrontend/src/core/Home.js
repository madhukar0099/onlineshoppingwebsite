import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  return (
   
  <Base   
   title="Home Page " description="Welcome to SHREE RAGHAVENDRA COIR INDUSTRIES">
    
     <img src=" RClogo.jpeg "  class="mx-auto d-block"  alt="Cinque Terre" width="304" height="236"></img> 
    
      <div className=" text-center">
        <h1 ><span className="badge badge-danger text-white">Our Products</span></h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
    
  );
}
/*
<img src="smiley.gif" alt="Smiley face" width="42" height="42" style="float:left"></img>
 <img src="smiley.gif" alt="Smiley face" width="42" height="42" style="float:right"></img>*/