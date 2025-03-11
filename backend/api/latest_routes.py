from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.sensor_data import SensorData 
from schemas.sensor_data_schema import SensorDataResponse

router = APIRouter()

class SensorDataRequest(BaseModel):
    sensor_id: str
    temperature: float
    humidity: float

@router.get("/latest", response_model=SensorDataResponse)
def getLatestData():
    session = SessionLocal()
    try:
        latestData = session.query(SensorData).order_by(SensorData.timestamp.desc()).first()
        if latestData:
            return latestData
        else:
            raise HTTPException(status_code=404, detail="No data found")

    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()