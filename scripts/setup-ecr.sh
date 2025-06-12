#!/bin/bash

# Setup script for Amazon ECR Public repository
# Run this script to create the ECR repository and set up initial configuration

set -e

# Configuration
REPOSITORY_NAME="emmanuelkesseh_profile"
AWS_REGION="us-east-1"
DESCRIPTION="Personal profile application for Emmanuel Kesseh - Backend Developer"

echo "🚀 Setting up Amazon ECR Public repository..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    echo "Visit: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
    exit 1
fi

# Check if user is logged in
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ AWS CLI is configured"

# Create ECR Public repository
echo "📦 Creating ECR Public repository: $REPOSITORY_NAME"

aws ecr-public create-repository \
    --repository-name $REPOSITORY_NAME \
    --catalog-data description="$DESCRIPTION" \
    --region $AWS_REGION \
    --output table || echo "Repository might already exist"

# Get repository details
echo "📋 Repository details:"
aws ecr-public describe-repositories \
    --repository-names $REPOSITORY_NAME \
    --region $AWS_REGION \
    --output table

# Get the registry URI
REGISTRY_URI=$(aws ecr-public describe-registries --region $AWS_REGION --query 'registries[0].registryUri' --output text)
REGISTRY_ALIAS=$(aws ecr-public describe-registries --region $AWS_REGION --query 'registries[0].aliases[0].name' --output text)

echo ""
echo "🎉 ECR Public repository setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Add these secrets to your GitHub repository:"
echo "   - AWS_ACCESS_KEY_ID: Your AWS access key"
echo "   - AWS_SECRET_ACCESS_KEY: Your AWS secret key"
echo "   - ECR_REGISTRY_ALIAS: $REGISTRY_ALIAS"
echo ""
echo "2. Your repository URI: $REGISTRY_URI/$REGISTRY_ALIAS/$REPOSITORY_NAME"
echo ""
echo "3. To manually push an image:"
echo "   docker build -t $REGISTRY_URI/$REGISTRY_ALIAS/$REPOSITORY_NAME:latest ."
echo "   aws ecr-public get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $REGISTRY_URI"
echo "   docker push $REGISTRY_URI/$REGISTRY_ALIAS/$REPOSITORY_NAME:latest"
echo ""
echo "4. Your public repository will be available at:"
echo "   https://gallery.ecr.aws/$REGISTRY_ALIAS/$REPOSITORY_NAME"