from sqlalchemy import Column, String, Float, DateTime, Integer
from database.db import Base
import datetime

class SensorData(Base):
    __tablename__ = "sensor_data"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(String, index=True)
    temperature = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
