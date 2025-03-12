import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from api.item_routes import router as item_router
from api.latest_routes import router as latest_router
from api.esp32_routes import router as esp32_router
from api.history_routes import router as history_router
from database.db import init_db


# Define lifespan event handler
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up... Initializing database")
    init_db()  # Initialize database connection
    yield  # App runs during this time
    print("Shutting down... Cleanup if needed")  # Optional cleanup

# Initialize FastAPI app with lifespan handler
app = FastAPI(
    title="IoT Freshness Prediction API",
    description="Backend for ESP32 data processing and ML predictions",
    version="1.0.0",
    lifespan=lifespan  # Attach lifespan context manager
)

# Enable CORS for Angular Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(esp32_router, prefix="/esp32", tags=["ESP32 Data"])
app.include_router(latest_router, prefix="/esp32", tags=["Latest Data"])
app.include_router(history_router, prefix="/esp32", tags=["History Data"])
app.include_router(item_router, prefix="/items", tags=["Stored Items"])



# Run server with Uvicorn
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)