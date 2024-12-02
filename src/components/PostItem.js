import React, { useState } from "react";

const PostItem = () => {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [photo, setPhoto] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); // Store the Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostItem = () => {
    if (!itemName || !description || !startingPrice || !duration || !photo) {
      alert("Please fill in all fields and upload a photo.");
      return;
    }

    const newItem = {
      id: Date.now(),
      itemName,
      description,
      startingPrice: parseFloat(startingPrice),
      currentBid: parseFloat(startingPrice),
      duration: parseInt(duration, 10),
      endTime: Date.now() + parseInt(duration, 10) * 60000,
      photo,
      bids: [],
    };

    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));

    alert("Item posted successfully!");
    setItemName("");
    setDescription("");
    setStartingPrice("");
    setDuration("");
    setPhoto("");
    localStorage.clear();

  };

  localStorage.clear();


  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", textAlign: "center" }}>
      <h2>Post an Item for Bidding</h2>
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ margin: "10px 0", padding: "10px", width: "100%", height: "100px" }}
      />
      <input
        type="number"
        placeholder="Starting Price"
        value={startingPrice}
        onChange={(e) => setStartingPrice(e.target.value)}
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <input
        type="number"
        placeholder="Bidding Duration (in minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ margin: "10px 0" }} />
      {photo && <img src={photo} alt="Preview" style={{ maxWidth: "100%", height: "auto", marginTop: "10px" }} />}
      <button onClick={handlePostItem} style={{ padding: "10px 20px", marginTop: "10px" }}>
        Post Item
      </button>
    </div>
  );
};

export default PostItem;
