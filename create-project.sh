#!/bin/sh -l

# Get the project name and id from inputs
PROJECT_NAME=$1
PROJECT_ID=$2

# Set the gcloud account, and authenticate
gcloud config set account $GCLOUD_AUTH

# Create a new GCP project
gcloud projects create $PROJECT_ID --name=$PROJECT_NAME

# Set the newly created project as the default
gcloud config set project $PROJECT_ID

echo "Project $PROJECT_NAME ($PROJECT_ID) created successfully."
