from fastapi import APIRouter, HTTPException, Query
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.sensor_data import SensorData
from schemas.sensor_data_schema import SensorDataResponse
from typing import List
from datetime import datetime

router = APIRouter()

@router.get("/history", response_model=List[SensorDataResponse])
def get_history(
    from_date: str = Query(None, description="Start date (YYYY-MM-DD)"),
    to_date: str = Query(None, description="End date (YYYY-MM-DD)")
):
    session = SessionLocal()
    try:
        # ✅ Validate date format
        if from_date:
            try:
                from_date = datetime.strptime(from_date, "%Y-%m-%d")
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid 'from_date' format. Use YYYY-MM-DD")

        if to_date:
            try:
                to_date = datetime.strptime(to_date, "%Y-%m-%d")
            except ValueError:
                raise HTTPException(status_code=400, detail="Invalid 'to_date' format. Use YYYY-MM-DD")

        # ✅ Query logic
        if from_date and to_date:
            data = session.query(SensorData).filter(
                SensorData.timestamp >= from_date,
                SensorData.timestamp <= to_date
            ).order_by(SensorData.timestamp.desc()).all()
        else:
            # ✅ If no date is provided, get the latest 200 rows
            data = session.query(SensorData).order_by(SensorData.timestamp.desc()).limit(200).all()

        # ✅ Handle 404 if no data found
        if not data:
            raise HTTPException(status_code=404, detail="No data found for the given date range.")

        return data
    finally:
        session.close()
