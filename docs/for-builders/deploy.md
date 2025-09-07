---
sidebar_position: 5
---

# Deploy Your App


## Introduction

Fortunately, deploying your Evo App __DOES NOT__ require any hosting or maintenance burdens by you or your team; but it's important to ensure it integrates seamlessly with the __Dash Platform Document Schema.__

This guide will walk you through the process of publishing an Evo App (Document) to the EvoNext Data Contract, enabling your app to interact with the Dash ecosystem. The specific Data Contract in question is __`6fBkKSne1xQ5GCPW9fdwEkH7nk8oYPu48vYiYssWzhX8`__, which can be viewed [__here__](https://platform-explorer.com/dataContract/6fBkKSne1xQ5GCPW9fdwEkH7nk8oYPu48vYiYssWzhX8?tab=schema).


## Prerequisites

Before you begin, ensure you have the following:

- A [__fully validated__](https://dashpay.io/) Evo App document schema.
- Access to the Dash Platform and the necessary permissions to publish documents.
- Basic understanding of JSON and API interactions.
- Node.js and npm installed on your development machine.


## Step 1: Set Up Your Development Environment

1. **Install Node.js and npm**: If you haven't already, download and install Node.js from the official website. npm will be installed alongside Node.js.
2. **Create a New Project Folder**: Organize your project files by creating a dedicated folder for your deployment scripts.


## Step 2: Create a Deployment Script

1. **Initialize a New Node.js Project**: Open your terminal, navigate to your project folder, and run:
   ```bash
   npm init -y
   ```
2. **Install Necessary Packages**: Install `axios` for making HTTP requests and `dotenv` for environment variable management.
   ```bash
   npm install axios dotenv
   ```

### Example Directory Structure

```
evo-app-deployment/
│
├── .env
├── deploy.js
└── package.json
```


## Step 3: Configure Environment Variables

Create a `.env` file in your project root to store sensitive information, such as your Dash Platform API key.

### .env

```
DASH_API_KEY=your_dash_api_key
DASH_CONTRACT_ID=6fBkKSne1xQ5GCPW9fdwEkH7nk8oYPu48vYiYssWzhX8
APP_URL=https://your-app-url.com
```


## Step 4: Write the Deployment Script

Create a `deploy.js` file to handle the publication of your document to the Dash Platform.

### deploy.js

```javascript
require('dotenv').config();
const axios = require('axios');

const DASH_API_KEY = process.env.DASH_API_KEY;
const DASH_CONTRACT_ID = process.env.DASH_CONTRACT_ID;
const APP_URL = process.env.APP_URL;

const publishDocument = async () => {
    try {
        const response = await axios.post(
            `https://api.dashplatform.com/v1/dataContracts/${DASH_CONTRACT_ID}/documents`,
            {
                data: {
                    appUrl: APP_URL,
                    // Add any additional data required by the Data Contract
                },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${DASH_API_KEY}`,
                },
            }
        );

        console.log('Document published successfully:', response.data);
    } catch (error) {
        console.error('Error publishing document:', error.response ? error.response.data : error.message);
    }
};

publishDocument();
```


## Step 5: Run the Deployment Script

1. Open your terminal and navigate to your project folder.
2. Run the deployment script:
   ```bash
   node deploy.js
   ```


## Step 6: Verify the Publication

1. **Check the Dash Platform Explorer**: Go to the Dash Platform Explorer and navigate to the Data Contract `6fBkKSne1xQ5GCPW9fdwEkH7nk8oYPu48vYiYssWzhX8` to ensure your document has been published successfully.
2. **Test the Integration**: Ensure your Evo App can interact with the Dash Platform as expected.


## Step 7: Automate the Deployment (Optional)

To automate the deployment process, you can set up a CI/CD pipeline using tools like GitHub Actions, GitLab CI, or CircleCI. Here’s a basic example using GitHub Actions:

### .github/workflows/deploy.yml

```yaml
name: Deploy to Dash Platform

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Run deployment script
      env:
        DASH_API_KEY: ${{ secrets.DASH_API_KEY }}
        DASH_CONTRACT_ID: 6fBkKSne1xQ5GCPW9fdwEkH7nk8oYPu48vYiYssWzhX8
        APP_URL: https://your-app-url.com
      run: node deploy.js
```


## Conclusion

You have successfully deployed your Evo App and published a document to the specified Dash Platform Data Contract. This integration allows your app to leverage the capabilities of the Dash Platform, enhancing its functionality and user experience.
