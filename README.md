# Project Name

> PictoSphere Vista

## Table of Contents

1. [Usage](#Usage)
2. [Development](#Development)

## Usage

Start EC2 instance on AWS
SSH into EC2 and cd into 'pictosphere-vista'
Install dependencies on EC2 by running 'npm install --no-optional --no-audit --legacy-peer-deps'
Set environment variables per .env.example (some or all may need to be set on the system if not working via .env file)
Save EC2 instance public ipv4 address to REACT_APP_EC2_INSTANCE environment variable
Run 'pm2 start server/server.js' on EC2 to start the Express server backend
Install dependencies by running 'npm install' locally
Run 'npm start' to start the local React app frontend
Run 'nodemon server/server.js' to start the local Express server backend
Open 'http://localhost:3000/' to load the React frontend for use

## Development

Run 'npm run build' to bundle the static build files
Upload contents of the 'build' directory to S3 bucket
Run 'git pull' on the branch on the EC2 and locally