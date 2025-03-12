from pydantic import BaseModel
from datetime import datetime

class itemData(BaseModel):
    item_name: str
    weight: float
    date_added: datetime

    class Config:
        from_attributes = True