#!/bin/bash

# Start Angular frontend in a new terminal
echo "Starting Angular frontend..."
cd frontend || { echo "Frontend directory not found!"; exit 1; }
start "Angular Server" cmd /k "ng serve"

# Start FastAPI backend in a new terminal
cd ../backend || { echo "Backend directory not found!"; exit 1; }
echo "Starting FastAPI backend..."
start "FastAPI Server" cmd /k "uvicorn main:app --reload"
