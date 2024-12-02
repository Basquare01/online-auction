import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PlaceBid = () => {
  const [items, setItems] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [bidderName, setBidderName] = useState(""); // New state for the bidder's name
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch saved items from localStorage
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    const currentTime = Date.now();

    const activeItems = savedItems.filter((item) => item.endTime > currentTime);
    setItems(activeItems);
  }, []);

  const handlePlaceBid = () => {
    if (!selectedItemId || !bidAmount || !bidderName) {
      alert("Please select an item, enter your name, and bid amount.");
      return;
    }

    const updatedItems = items.map((item) => {
      if (item.id === parseInt(selectedItemId, 10)) {
        if (parseFloat(bidAmount) <= item.currentBid) {
          alert("Your bid must be higher than the current bid.");
          return item;
        }
        return {
          ...item,
          currentBid: parseFloat(bidAmount),
          bids: [
            ...item.bids,
            { bidAmount: parseFloat(bidAmount), bidderName }, // Save bidder's name
          ],
        };
      }
      return item;
    });

    localStorage.setItem("items", JSON.stringify(updatedItems));
    setItems(updatedItems);

    alert("Bid placed successfully!");
    setBidAmount("");
    setBidderName(""); // Clear the name field
    navigate("/home");
  };
  localStorage.clear();


  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", textAlign: "center" }}>
      <h2>Place a Bid</h2>
      <div style={{ position: "relative" }}>
        <select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          onMouseOver={(e) => {
            const itemId = parseInt(e.target.value, 10);
            setHoveredItemId(itemId);
          }}
          onMouseOut={() => setHoveredItemId(null)}
          style={{ margin: "10px 0", padding: "10px", width: "100%" }}
        >
          <option value="">Select an Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.itemName} - Current Bid: ${item.currentBid}
            </option>
          ))}
        </select>
        {hoveredItemId && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#fff",
              padding: "10px",
              border: "1px solid #ddd",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              zIndex: 10,
            }}
          >
            <img
              src={items.find((item) => item.id === hoveredItemId)?.photo}
              alt="Item"
              style={{ maxWidth: "300px", maxHeight: "200px", display: "block" }}
            />
            <p>
              <strong>{items.find((item) => item.id === hoveredItemId)?.itemName}</strong>
            </p>
          </div>
        )}
      </div>
      <input
        type="text"
        placeholder="Enter your name"
        value={bidderName}
        onChange={(e) => setBidderName(e.target.value)}
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <input
        type="number"
        placeholder="Enter your bid"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        style={{ margin: "10px 0", padding: "10px", width: "100%" }}
      />
      <button onClick={handlePlaceBid} style={{ padding: "10px 20px", marginTop: "10px" }}>
        Place Bid
      </button>
    </div>
  );

};

export default PlaceBid;
