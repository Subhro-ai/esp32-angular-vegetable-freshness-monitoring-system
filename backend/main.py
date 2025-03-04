import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from database.db import init_db  # Database connection
from contextlib import asynccontextmanager
from api.esp32_routes import router as esp32_router



# Define lifespan event handler
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up... Initializing database")
    # await init_db()  # Initialize database connection
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

# Run server with Uvicorn
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)