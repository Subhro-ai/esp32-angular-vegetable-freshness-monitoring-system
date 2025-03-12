from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.stored_item import StoredItem
from schemas.item_schema import itemData
from fastapi import Query
from datetime import datetime


router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/store-item")
def store_item(item: itemData, db: Session = Depends(get_db)):
    db_item = StoredItem(
        item_name=item.item_name,
        weight=item.weight,
        date_added=item.date_added
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return {"message": "Item stored successfully!", "item_id": db_item.id}

@router.get("/get-items", response_model=list[itemData])
def get_items(
    db: Session = Depends(get_db),
    from_date: datetime = Query(None),
    to_date: datetime = Query(None),
):
    query = db.query(StoredItem)

    if from_date:
        query = query.filter(StoredItem.date_added >= from_date)
    if to_date:
        query = query.filter(StoredItem.date_added <= to_date)

    items = query.all()

    if not items:
        raise HTTPException(status_code=404, detail="No items found.")

    return items
