# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY backend/requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application's code to the working directory
COPY backend/ /app/backend/

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
