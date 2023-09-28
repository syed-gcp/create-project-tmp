#!/bin/sh -l

PROJECT_NAME=$1
PROJECT_ID=$2
FLAGS=$3 # This will hold optional flags

# Set the gcloud account, and authenticate
gcloud config set account $GCLOUD_AUTH

# Create a new GCP project with optional flags
gcloud projects create $PROJECT_ID --name=$PROJECT_NAME $FLAGS

# Set the newly created project as the default
gcloud config set project $PROJECT_ID

echo "Project $PROJECT_NAME ($PROJECT_ID) created successfully."
