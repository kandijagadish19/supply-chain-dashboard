import React, { useState, useEffect } from "react";

/**
 * LiveCounter Component
 * Displays real-time operational counters for the supply chain dashboard.
 * Polls the API every 5 seconds for updated counts.
 */
const LiveCounter = ({ endpoint, label, color = "#2C5F8A" }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        setCount(data.count);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch");
        setLoading(false);
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, [endpoint]);

  return (
    <div style={styles.card}>
      <div style={{ ...styles.indicator, backgroundColor: color }} />
      <p style={styles.label}>{label}</p>
      {loading ? (
        <p style={styles.count}>...</p>
      ) : error ? (
        <p style={{ ...styles.count, color: "red" }}>—</p>
      ) : (
        <p style={styles.count}>{count.toLocaleString()}</p>
      )}
      <p style={styles.live}>● LIVE</p>
    </div>
  );
};

const styles = {
  card: {
    background: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: 8,
    padding: "20px 24px",
    minWidth: 160,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    position: "relative",
    textAlign: "center",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    position: "absolute",
    top: 12,
    right: 12,
  },
  label: { fontSize: 13, color: "#666", margin: "0 0 8px" },
  count: { fontSize: 32, fontWeight: "bold", color: "#1a1a2e", margin: 0 },
  live: { fontSize: 10, color: "#27ae60", marginTop: 6 },
};

export default LiveCounter;

// Usage example:
// <LiveCounter endpoint="/api/shipments/count" label="Active Shipments" color="#2C5F8A" />
// <LiveCounter endpoint="/api/vehicles/count" label="Vehicles on Road" color="#e67e22" />
// <LiveCounter endpoint="/api/orders/pending" label="Pending Orders" color="#e74c3c" />
