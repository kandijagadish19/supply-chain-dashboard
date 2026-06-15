# 🚚 Supply Chain Dashboard

A real-time logistics and supply chain management dashboard built with React.js and Node.js. Developed as part of an enterprise logistics platform serving clients like ITC, Maruti Suzuki, Mahindra & Mahindra, and HPCL.

## ✨ Features

- 📊 Real-time endpoint health and shipment tracking dashboards
- ⚖️ Live weight & volume calculator for vehicle load management
- 🔢 Live counters for operational metrics
- 🗺️ Mobile map integration for live fleet/vehicle tracking
- 📋 Data management with filtering, sorting, and pagination
- 🧩 Data segregation engine for workflow routing
- 📱 REST APIs consumed by mobile app teams
- 🐳 Dockerised for consistent dev/prod environments

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Redux, HTML5, CSS3 |
| Backend | Node.js, Express.js |
| Database | MongoDB, SQL |
| DevOps | Docker, Jenkins, GitHub |
| API Testing | Postman |

## 📁 Project Structure

```
supply-chain-dashboard/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   │   ├── LiveCounter.jsx
│   │   │   │   ├── ShipmentTracker.jsx
│   │   │   │   └── WeightVolumeCalc.jsx
│   │   │   ├── DataManagement/
│   │   │   │   ├── BulkUpload.jsx
│   │   │   │   └── DataTable.jsx
│   │   │   └── Maps/
│   │   │       └── FleetMap.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   └── App.jsx
├── server/
│   ├── routes/
│   │   ├── shipment.js
│   │   ├── inventory.js
│   │   └── vehicle.js
│   ├── models/
│   │   ├── Shipment.js
│   │   └── Vehicle.js
│   └── server.js
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/kandijagadish19/supply-chain-dashboard.git
cd supply-chain-dashboard

# Install dependencies
cd client && npm install
cd ../server && npm install

# Run with Docker
docker-compose up

# Or run manually
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm start
```

## 📸 Key Screens

- **Main Dashboard** — live shipment counters, vehicle status, alerts
- **Weight/Volume Calculator** — real-time computation as operators input load data
- **Fleet Map** — live vehicle locations via mobile map integration
- **Data Management** — CRUD operations with bulk upload support
