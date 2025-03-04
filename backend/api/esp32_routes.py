from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
# from database.crud import store_sensor_data
import datetime


router = APIRouter()


class SensorData(BaseModel):
    sensor_id: str
    temperature: float
    humidity: float
    timestamp: str = datetime.datetime.now().isoformat()


@router.post("/data")
async def receive_sensor_data(data: SensorData):
    try:
        # await store_sensor_data(data)  # Save to database
        print(data)
        return {"status": "success", "message": "Data received"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))