from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from database.db import Base

class StoredItem(Base):
    __tablename__ = "stored_items"

    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String, nullable=False)
    weight = Column(Float, nullable=False)
    date_added = Column(DateTime, default=datetime.utcnow)
