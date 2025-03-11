# 📡 IoT Vegetable Freshness Monitoring System

🚀 **An IoT-based project using ESP32, FastAPI, and Angular to monitor vegetable/fruit freshness based on temperature, humidity, and time of storage.**

![GitHub repo size](https://img.shields.io/github/repo-size/subhro-ai/esp32-angular-vegetable-freshness-monitoring-system)
![GitHub contributors](https://img.shields.io/github/contributors/subhro-ai/esp32-angular-vegetable-freshness-monitoring-system)
![GitHub stars](https://img.shields.io/github/stars/subhro-ai/esp32-angular-vegetable-freshness-monitoring-system)

---

## 🛠 Tech Stack

| Technology     | Description                |
|----------------|---------------------------|
| 🟢 **FastAPI**  | Backend API                |
| 💻 **Angular**  | Frontend Interface         |
| 💽 **PostgreSQL** | Database for storage      |
| 📡 **ESP32**    | Sensor data collector      |
| 📊 **Chart.js** | Real-time data visualization |

---

## 📜 Project Overview
This project is designed to monitor the freshness of vegetables and fruits stored in large cold storage units. Using an ESP32 microcontroller, temperature and humidity data are collected and sent to a FastAPI backend. The backend stores the data in a PostgreSQL database and provides real-time access to the Angular frontend.

✅ **Key Features:**
- 📡 **Real-time Data Fetching** from ESP32.
- 📊 **Temperature and Humidity History.**
- ⏩ **Live Auto-Refresh Data Every 5 Seconds.**
- 💽 **Data Stored in PostgreSQL.**
- ⚡ **Pydantic Schema** for clean API responses.
- 📅 **Date Range Filtering for Historical Data.**

---

## 📊 Data Flow
```text
[ESP32] --> [FastAPI Backend] --> [PostgreSQL Database] --> [Angular Frontend]
```

The ESP32 sends data every **5 seconds** to the FastAPI backend. The backend stores the data and serves:
- ✅ `/latest` API → Provides the latest temperature, humidity, and heat index.
- ✅ `/history` API → Provides historical data with date filters.

---

## 💾 Installation

### 🚀 1. Clone the Repository
```bash
git clone https://github.com/yourusername/esp32-room-temperature.git
cd esp32-room-temperature
```

### 💻 2. Setup Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

✅ FastAPI will now run on: [http://localhost:8000](http://localhost:8000)

### 🛠 3. Setup Frontend (Angular)
```bash
cd frontend
npm install
ng serve --open
```

✅ Angular will now run on: [http://localhost:4200](http://localhost:4200)

### 💽 4. Setup PostgreSQL Database
1. Install PostgreSQL if not already installed.
2. Create a database named `esp32_data`.
3. Run the following queries:
```sql
CREATE DATABASE esp32_data;
CREATE TABLE sensor_data (
    id SERIAL PRIMARY KEY,
    sensor_id VARCHAR(255),
    temperature FLOAT,
    humidity FLOAT,
    heat_index FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

✅ Database is now ready.

---

## 📡 API Endpoints
### ✅ 1. `/latest` - Get the Latest Data
```shell
GET /esp32/latest
```
Response:
```json
{
  "sensor_id": "esp32_01",
  "temperature": 27.5,
  "humidity": 86.2,
  "heat_index": 33.4,
  "timestamp": "2025-03-11T10:15:22"
}
```

### ✅ 2. `/history` - Get Historical Data
```shell
GET /esp32/history?from=2025-03-10&to=2025-03-11
```
Response:
```json
[
  {
    "sensor_id": "esp32_01",
    "temperature": 27.5,
    "humidity": 86.2,
    "heat_index": 33.4,
    "timestamp": "2025-03-11T10:15:22"
  },
  ...
]
```

### ✅ 3. `/esp32/data` - Receive Data from ESP32
```shell
POST /esp32/data
```
Body:
```json
{
  "sensor_id": "esp32_01",
  "temperature": 27.5,
  "humidity": 86.2
}
```

---

## 💻 Folder Structure
```text
esp32-room-temperature
│
├── backend
│   ├── main.py
│   ├── database
│   ├── models
│   ├── api
│
├── frontend
│   ├── src
│   ├── app
│   ├── services
│   ├── components
```

---

## 🤝 Contributing
Contributions are welcome! Feel free to fork this repo and submit a pull request.

## 📜 License
This project is licensed under the **MIT License**. Feel free to use and modify it.

---

💯 **Built with ❤️ using FastAPI, Angular, PostgreSQL, and ESP32.** 🚀😎

