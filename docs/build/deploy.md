---
# docs/build/deploy.md

sidebar_position: 5
---

# Deploy Your EvoApp

Deploying your EvoApp to the Dash Network eliminates traditional hosting concerns while providing unparalleled resilience and availability. This guide walks you through publishing your EvoApp to the Dash Platform ecosystem.

<icon-grid columns={2}>
    <icon-card icon="🚀" title="Decentralized Hosting">
        Your EvoApp is stored permanently on Dash Drive, ensuring it remains accessible without traditional hosting costs or maintenance.
    </icon-card>
    <icon-card icon="🔗" title="Blockchain Integration">
        Deploy with confidence knowing your app integrates seamlessly with the Dash Platform Document Schema.
    </icon-card>
</icon-grid>

## Understanding Dash Drive Deployment

Unlike traditional hosting solutions, EvoApps leverage Dash Drive - a decentralized storage system built into the Dash Platform. When you deploy your EvoApp, it becomes part of the distributed network, providing:

- **Permanent Availability**: No server downtime or hosting failures
- **Censorship Resistance**: Your app cannot be arbitrarily taken down
- **Global Distribution**: Content is distributed across the Dash Network
- **No Monthly Hosting Costs**: One-time registration fees only

## Prerequisites

Before deploying your EvoApp, ensure you have:

<div class="icon-grid grid-cols-2">
  <div class="icon-card">
    <div class="icon">📋</div>
    <h3>Validated EvoApp</h3>
    <p>A fully functional EvoApp with all components tested and working properly.</p>
  </div>
  <div class="icon-card">
    <div class="icon">🆔</div>
    <h3>Dash Platform Identity</h3>
    <p>A registered Dash Identity with sufficient Dash balance for registration fees.</p>
  </div>
  <div class="icon-card">
    <div class="icon">📁</div>
    <h3>App Files</h3>
    <p>All application files properly organized and optimized for deployment.</p>
  </div>
  <div class="icon-card">
    <div class="icon">🔑</div>
    <h3>Development Environment</h3>
    <p>Node.js, npm, and EvoNext SDK installed on your development machine.</p>
  </div>
</div>

## Step 1: Prepare Your EvoApp for Deployment

### Optimize Your App Structure

Organize your EvoApp files following this recommended structure:

```
my-evoapp/
├── index.html          # Main HTML file
├── assets/             # Static assets (images, CSS)
│   ├── css/
│   ├── images/
│   └── fonts/
├── js/                 # JavaScript files
└── metadata.json       # App metadata
```

### Create App Metadata

Create a`metadata.json` file in your project root:

```json
{
  "name": "My EvoApp",
  "description": "A brief description of your EvoApp",
  "version": "1.0.0",
  "author": {
    "name": "Your Name",
    "identityId": "yourDashIdentityId"
  },
  "category": "utility",
  "keywords": ["evoapp", "dash", "decentralized"],
  "icon": "assets/images/icon.png",
  "screenshots": [
    "assets/images/screenshot1.png",
    "assets/images/screenshot2.png"
  ],
  "permissions": [
    "identity.read",
    "documents.read",
    "documents.write"
  ],
  "entryPoint": "index.html",
  "files": [
    "index.html",
    "assets/",
    "js/"
  ]
}
```

## Step 2: Set Up Deployment Environment

### Install EvoNext SDK

```bash
# Install the EvoNext SDK globally
npm install -g @evonext/sdk

# Create a new project folder and initialize it
mkdir evoapp-deployment
cd evoapp-deployment
npm init -y
```

### Install Required Packages

```bash
npm install @evonext/sdk dotenv
```

## Step 3: Create Deployment Configuration

Create a`.env` file to store your sensitive information:

```env
# Dash Platform Configuration
DASH_MNEMONIC="your twelve word mnemonic phrase"
DASH_NETWORK="testnet"  # Change to "mainnet" for production deployment

# EvoApp Configuration
APP_NAME="My EvoApp"
APP_VERSION="1.0.0"
APP_CATEGORY="utility"

# Domain Configuration
DESIRED_DOMAIN="myapp.dash"  # Your desired Dash Drive domain
```

:::warning Security Note

Never commit your`.env` file to version control systems. Add it to your`.gitignore` file immediately.

:::

## Step 4: Write the Deployment Script

Create a`deploy.js` file to handle the deployment process:

```javascript
// Import required libraries
require('dotenv').config()
const { EvoNext, Crypto } = require('@evonext/sdk')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

async function deployEvoApp() {
    try {
        // Initialize EvoNext SDK
        const network = process.env.DASH_NETWORK || 'testnet'
        const mnemonic = process.env.DASH_MNEMONIC

        if (!mnemonic) {
            throw new Error('DASH_MNEMONIC not found in environment variables')
        }

        console.log('Initializing EvoNext SDK...')
        const sdk = new EvoNext(network)

        // Connect to the network
        await sdk.connect({
            mnemonic,
        })

        console.log(`Connected to ${network}`)

        // Create a client
        const client = sdk.getClient()
        const account = await sdk.getAccount()

        // Read and validate app metadata
        const metadataPath = path.join(__dirname, '../my-evoapp/metadata.json')
        if (!fs.existsSync(metadataPath)) {
            throw new Error('metadata.json not found. Please create it before deploying.')
        }

        const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'))

        // Validate required fields
        if (!metadata.name || !metadata.version || !metadata.entryPoint) {
            throw new Error('Invalid metadata.json. Missing required fields.')
        }

        console.log(`Deploying ${metadata.name} v${metadata.version}...`)

        // Step 1: Register Dash Drive domain (if not already registered)
        const desiredDomain = process.env.DESIRED_DOMAIN
        if (desiredDomain) {
            console.log(`Checking if domain "${desiredDomain}" is available...`)
            const domainAvailable = await sdk.isDomainAvailable(desiredDomain)

            if (domainAvailable) {
                console.log(`Registering domain "${desiredDomain}"...`)
                const domainDocument = await sdk.registerDomain(desiredDomain, account.getIdentityId())
                console.log(`Domain registration TX ID: ${domainDocument.getId()}`)
            } else {
                console.log(`Domain "${desiredDomain}" is already registered.`)
            }
        }

        // Step 2: Upload app files to Dash Drive
        console.log('Uploading app files to Dash Drive...')
        const appPath = path.join(__dirname, '../my-evoapp')
        const contractId = process.env.DASH_CONTRACT_ID || '6fBkKSne1xQ5GCPW9fdwEkH7nk8oYPu48vYiYssWzhX8'

        // Create a data contract for the EvoApp if needed
        console.log('Creating/updating data contract...')
        const dataContract = await sdk.createOrUpdateDataContract(contractId, {
            evoApp: {
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    version: { type: 'string' },
                    developerId: { type: 'string' },
                    domain: { type: 'string' },
                    contractId: { type: 'string' },
                    files: { type: 'array' },
                    createdAt: { type: 'integer' },
                },
                required: ['name', 'version', 'developerId'],
                indices: [
                    {
                        name: 'domainIndex',
                        properties: [{ domain: 'asc' }],
                        unique: true,
                    },
                ],
            },
        })

        console.log(`Data contract ID: ${dataContract.getId()}`)

        // Step 3: Upload files to Dash Drive
        const files = await sdk.uploadAppFiles(appPath, {
            contractId: dataContract.getId(),
            identityId: account.getIdentityId(),
        })

        console.log(`Uploaded ${files.length} files to Dash Drive`)

        // Step 4: Register the EvoApp on the EvoNext app registry
        console.log('Registering EvoApp on EvoNext...')
        const appRegistryDocument = await client.platform.documents.create(
            'evoApp.appContract',
            account.getIdentityId(),
            {
                app: {
                    name: metadata.name,
                    description: metadata.description,
                    version: metadata.version,
                    developerId: account.getIdentityId(),
                    category: metadata.category,
                    domain: desiredDomain,
                    contractId: dataContract.getId(),
                    files: files,
                    createdAt: Date.now(),
                }
            }
        )

        // Submit the document to the platform
        await client.platform.documents.broadcast(appRegistryDocument)

        console.log('EvoApp successfully deployed!')
        console.log(`App Registry ID: ${appRegistryDocument.getId()}`)
        console.log(`Access your app at: https://${desiredDomain}`)

        // Close the connection
        await sdk.disconnect()
    } catch (error) {
        console.error('Deployment failed:', error.message)
        process.exit(1)
    }
}

// Execute the deployment
deployEvoApp()
```

## Step 5: Run the Deployment

Execute the deployment script:

```bash
node deploy.js
```

The deployment process will:

1. Connect to the Dash Network using your credentials
2. Register your domain on Dash Drive (if not already registered)
3. Create or update the necessary data contract
4. Upload your app files to Dash Drive
5. Register your EvoApp in the EvoNext app registry

## Step 6: Verify Your Deployment

After successful deployment, verify that:

<icon-grid columns={2}>
    <icon-card icon="🌐" title="Domain Accessibility">
        Your app is accessible through your registered Dash Drive domain.
    </icon-card>
    <icon-card icon="📋" title="Registration Confirmation">
        Your app appears in the EvoNext app registry and is discoverable by other users.
    </icon-card>
</icon-grid>

### Testing with Platform Explorer

1. Visit the [Dash Platform Explorer](https://platform-explorer.com/)
2. Navigate to the Data Contract:`6fBkKSne1xQ5GCPW9fdwEkH7nk8oYPu48vYiYssWzhX8`
3. Search for your app by name or domain
4. Verify all files and metadata are correctly stored

## Step 7: Automate Deployment (Optional)

For continuous deployment, set up a GitHub Actions workflow:

```yaml
# .github/workflows/deploy.yml
name: Deploy EvoApp

on:
  push:
    tags:
      - 'v*'  # Trigger on version tags like v1.0.0

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test

    - name: Deploy EvoApp
      env:
        DASH_MNEMONIC: ${{ secrets.DASH_MNEMONIC }}
        DASH_NETWORK: ${{ secrets.DASH_NETWORK }}
        DESIRED_DOMAIN: ${{ secrets.DESIRED_DOMAIN }}
      run: node deploy.js
```

## Advanced Deployment Options

### Progressive Rollouts

For updating existing EvoApps without disrupting users:

```javascript
// Sample code for progressive rollout
async function progressiveRelease(newAppVersion) {
    // First deploy to a test domain
    const testDomain = `test-${newAppVersion}.dash`
    await deployToDomain(testDomain)

    // Run UAT tests
    const testsPassed = await runUATTests(`https://${testDomain}`)

    if (testsPassed) {
        // If tests pass, deploy to the main domain
        await deployToDomain(process.env.MAIN_DOMAIN)
    } else {
        throw new Error('UAT tests failed. Deployment aborted.')
    }
}
```

### Versioning Strategy

Implement semantic versioning for your EvoApp:

```javascript
// Sample code for version management
async function versionApp() {
    const currentVersion = require('../package.json').version
    const newVersion = semver.inc(currentVersion, 'patch') // or 'minor'/'major'

    // Update package.json
    const packageJson = require('../package.json')
    packageJson.version = newVersion
    fs.writeFileSync(
        path.join(__dirname, '../package.json'),
        JSON.stringify(packageJson, null, 2)
    )

    // Create git tag
    execSync(`git add package.json && git commit -m "Version ${newVersion}" && git tag v${newVersion}`)

    return newVersion
}
```

## Troubleshooting Common Issues

<icon-grid columns={2}>
    <icon-card icon="💰" title="Insufficient Balance">
        Ensure you have enough Dash to cover domain registration and document fees.
    </icon-card>
    <icon-card icon="🔥" title="Rate Limiting">
        If experiencing rate limiting, implement delays between operations or batch your requests.
    </icon-card>
</icon-grid>

### Common Deployment Errors

| | Error | Cause | Solution | |
|-------|-------|----------|
| | "Domain already registered" | The domain you want is taken by another user | Choose a different domain name | |
| | "Insufficient balance" | Not enough Dash in your wallet | Add more Dash to your wallet | |
| | "Document validation failed" | Your app data doesn't match the schema | Check your metadata and ensure it follows the required schema | |
| | "Transaction rejected" | Network congestion or invalid transaction | Retry the deployment or check your data format | |

## Next Steps

After successfully deploying your EvoApp:

1. Submit your app to the [EvoNext Marketplace](https://evonext.app/store)
2. Promote your app on social media and the [Dash Forum](https://www.dash.org/forum/)
3. Monitor app usage and analytics through the EvoNext Developer Dashboard
4. Plan updates and improvements based on user feedback

:::tip Need Help?

If you encounter issues during deployment:

- Check our [developer documentation](./examples)
- Visit the [EvoNext GitHub repository](https://github.com/sansbankdao/evonext-app)
- Contact our development team at dev@evonext.app

:::
