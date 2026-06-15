import React, { useState, useCallback } from "react";

/**
 * WeightVolumeCalc Component
 * Real-time weight and volume calculator for vehicle load management.
 * Calculates live as operators input load data — no submit required.
 */
const WeightVolumeCalc = ({ vehicleCapacity = { maxWeight: 10000, maxVolume: 50 } }) => {
  const [items, setItems] = useState([{ id: 1, name: "", weight: "", length: "", width: "", height: "", qty: 1 }]);

  const addItem = () =>
    setItems(prev => [...prev, { id: Date.now(), name: "", weight: "", length: "", width: "", height: "", qty: 1 }]);

  const removeItem = (id) =>
    setItems(prev => prev.filter(item => item.id !== id));

  const updateItem = (id, field, value) =>
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));

  // Live calculation — recomputes on every keystroke
  const totals = useCallback(() => {
    return items.reduce((acc, item) => {
      const qty = parseFloat(item.qty) || 0;
      const weight = parseFloat(item.weight) || 0;
      const vol = ((parseFloat(item.length) || 0) * (parseFloat(item.width) || 0) * (parseFloat(item.height) || 0)) / 1000000; // cm³ to m³
      return {
        weight: acc.weight + weight * qty,
        volume: acc.volume + vol * qty,
      };
    }, { weight: 0, volume: 0 });
  }, [items]);

  const { weight: totalWeight, volume: totalVolume } = totals();
  const weightPct = Math.min((totalWeight / vehicleCapacity.maxWeight) * 100, 100);
  const volumePct = Math.min((totalVolume / vehicleCapacity.maxVolume) * 100, 100);
  const isOverWeight = totalWeight > vehicleCapacity.maxWeight;
  const isOverVolume = totalVolume > vehicleCapacity.maxVolume;

  const barColor = (pct) => pct > 90 ? "#e74c3c" : pct > 70 ? "#e67e22" : "#27ae60";

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>⚖️ Vehicle Load Calculator</h3>

      {/* Items Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            {["Item Name", "Weight (kg)", "L (cm)", "W (cm)", "H (cm)", "Qty", ""].map(h => (
              <th key={h} style={styles.th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              {["name", "weight", "length", "width", "height", "qty"].map(field => (
                <td key={field} style={styles.td}>
                  <input
                    style={styles.input}
                    type={field === "name" ? "text" : "number"}
                    value={item[field]}
                    placeholder={field === "name" ? "Item name" : "0"}
                    onChange={e => updateItem(item.id, field, e.target.value)}
                  />
                </td>
              ))}
              <td style={styles.td}>
                <button style={styles.removeBtn} onClick={() => removeItem(item.id)}>✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button style={styles.addBtn} onClick={addItem}>+ Add Item</button>

      {/* Live Totals */}
      <div style={styles.totals}>
        <div style={styles.totalCard}>
          <p style={styles.totalLabel}>Total Weight</p>
          <p style={{ ...styles.totalValue, color: isOverWeight ? "#e74c3c" : "#1a1a2e" }}>
            {totalWeight.toFixed(1)} kg
            {isOverWeight && <span style={styles.overLimit}> ⚠ OVER LIMIT</span>}
          </p>
          <div style={styles.barBg}>
            <div style={{ ...styles.barFill, width: `${weightPct}%`, background: barColor(weightPct) }} />
          </div>
          <p style={styles.capacity}>{weightPct.toFixed(1)}% of {vehicleCapacity.maxWeight} kg</p>
        </div>

        <div style={styles.totalCard}>
          <p style={styles.totalLabel}>Total Volume</p>
          <p style={{ ...styles.totalValue, color: isOverVolume ? "#e74c3c" : "#1a1a2e" }}>
            {totalVolume.toFixed(3)} m³
            {isOverVolume && <span style={styles.overLimit}> ⚠ OVER LIMIT</span>}
          </p>
          <div style={styles.barBg}>
            <div style={{ ...styles.barFill, width: `${volumePct}%`, background: barColor(volumePct) }} />
          </div>
          <p style={styles.capacity}>{volumePct.toFixed(1)}% of {vehicleCapacity.maxVolume} m³</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { fontFamily: "Arial, sans-serif", padding: 24, background: "#f9f9f9", borderRadius: 10 },
  title: { marginBottom: 16, color: "#1a1a2e" },
  table: { width: "100%", borderCollapse: "collapse", background: "#fff", marginBottom: 12 },
  th: { padding: "8px 10px", background: "#2C5F8A", color: "#fff", fontSize: 12, textAlign: "left" },
  td: { padding: "6px 8px", borderBottom: "1px solid #eee" },
  input: { width: "100%", padding: "4px 6px", border: "1px solid #ddd", borderRadius: 4, fontSize: 13 },
  addBtn: { padding: "8px 16px", background: "#2C5F8A", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", marginBottom: 20 },
  removeBtn: { background: "#e74c3c", color: "#fff", border: "none", borderRadius: 4, padding: "2px 8px", cursor: "pointer" },
  totals: { display: "flex", gap: 20 },
  totalCard: { flex: 1, background: "#fff", padding: 16, borderRadius: 8, border: "1px solid #e0e0e0" },
  totalLabel: { fontSize: 13, color: "#666", margin: "0 0 4px" },
  totalValue: { fontSize: 24, fontWeight: "bold", margin: "0 0 10px" },
  overLimit: { fontSize: 12, color: "#e74c3c" },
  barBg: { background: "#eee", borderRadius: 4, height: 8, overflow: "hidden", marginBottom: 6 },
  barFill: { height: "100%", borderRadius: 4, transition: "width 0.3s, background 0.3s" },
  capacity: { fontSize: 11, color: "#999", margin: 0 },
};

export default WeightVolumeCalc;
