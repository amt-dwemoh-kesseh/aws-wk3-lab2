#!/bin/bash

# Local build and test script
# This script builds the Docker image locally and runs basic tests

set -e

# Configuration
IMAGE_NAME="emmanuelkesseh_profile"
CONTAINER_NAME="profile_test"
PORT=3000

echo "🔨 Building Docker image locally..."

# Build the Docker image
docker build -t $IMAGE_NAME:latest .

echo "✅ Docker image built successfully"

# Stop and remove existing container if it exists
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

echo "🚀 Starting container for testing..."

# Run the container
docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:3000 \
    $IMAGE_NAME:latest

# Wait for the application to start
echo "⏳ Waiting for application to start..."
sleep 5

# Test if the application is responding
if curl -f http://localhost:$PORT > /dev/null 2>&1; then
    echo "✅ Application is running successfully at http://localhost:$PORT"
    
    # Test API endpoint
    if curl -f http://localhost:$PORT/api/profile > /dev/null 2>&1; then
        echo "✅ API endpoint is working"
    else
        echo "⚠️  API endpoint test failed"
    fi
else
    echo "❌ Application failed to start"
    docker logs $CONTAINER_NAME
    exit 1
fi

echo ""
echo "🎉 Local build and test completed successfully!"
echo ""
echo "📝 Commands to interact with your container:"
echo "  View logs: docker logs $CONTAINER_NAME"
echo "  Stop container: docker stop $CONTAINER_NAME"
echo "  Remove container: docker rm $CONTAINER_NAME"
echo "  Access application: http://localhost:$PORT"
echo ""
echo "🔧 To clean up:"
echo "  docker stop $CONTAINER_NAME && docker rm $CONTAINER_NAME"