from pydantic import BaseModel
from datetime import datetime

class SensorDataResponse(BaseModel):
    sensor_id: str
    temperature: float
    humidity: float
    timestamp: datetime

    class Config:
        from_attributes = True

