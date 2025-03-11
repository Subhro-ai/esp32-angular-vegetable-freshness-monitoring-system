from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.sensor_data import SensorData 

router = APIRouter()

# Request Body Model
class SensorDataRequest(BaseModel):
    sensor_id: str
    temperature: float
    humidity: float

# POST request to receive data from ESP32
@router.post("/data")
async def receive_sensor_data(data: SensorDataRequest):
    session = SessionLocal()
    try:
        # ✅ Insert data into the database
        sensor_entry = SensorData(
            sensor_id=data.sensor_id,
            temperature=data.temperature,
            humidity=data.humidity
        )
        session.add(sensor_entry)
        session.commit()
        return {"status": "success", "message": "Data saved to database"}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()
