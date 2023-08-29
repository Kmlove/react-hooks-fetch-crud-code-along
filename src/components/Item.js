import React from "react";

function Item({ item, onUpdatedItem, onDeleteItem }) {
  const url = "http://localhost:4000/items"

  function handleAddToCartClick(e){
   
    fetch(`${url}/${item.id}`, {
      method: "PATCH",
      headers: {
        "content-type" : "application/json",
        "accept" : "application/json"
      },
      body: JSON.stringify({isInCart: !item.isInCart})
    })
    .then(res => res.json())
    .then(data => onUpdatedItem(data))
  }

  function handleDeleteClick(e){
    fetch(`${url}/${item.id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(data => onDeleteItem(item))
  }
  
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;
