import React, { useState } from "react";

function ItemForm({onAddItem}) {
  const url = "http://localhost:4000/items"
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(e){
    e.preventDefault()

    const newItem = {
      name: name,
      category: category,
      inInCart: false
    }

    fetch(url, {
      method: "POST",
      headers: {
        "content-type" : "application/json",
        "accept" : "application/json"
      },
      body: JSON.stringify(newItem)
    })
    .then(res => res.json())
    .then(data => onAddItem(data))
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
