import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const url = "http://localhost:4000/items"
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(url)
    .then(res=> res.json())
    .then(data => setItems(data))
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(newItem){
    setItems([...items, newItem])
  }

  function handleUpdatedItem(updatedItem){
    const updatedItems = items.map((item) => {
      if(updatedItem.id === item.id){
        return updatedItem
      } else {
        return item
      }
    })

    setItems(updatedItems)
  }

  function handleDeleteItem(deletedItem){
    const updatedItems = items.filter((item) => {
      if(item.id !== deletedItem.id){
        return true
      }
    })

    setItems(updatedItems)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
            key={item.id} 
            item={item} 
            onUpdatedItem={handleUpdatedItem} 
            onDeleteItem={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
