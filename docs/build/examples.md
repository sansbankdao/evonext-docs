---
# docs/build/examples.md

sidebar_position: 6
---

# Examples

Welcome to our EvoNext examples collection! Here you'll find practical code samples, templates, and demonstrations to help you build on the EvoNext platform.

<icon-grid columns={2}>
    <icon-card icon="💡" title="Practical Implementations">
        Real-world examples of EvoNext integrations and applications to accelerate your development process.
    </icon-card>
    <icon-card icon="📚" title="Code Samples">
        Ready-to-use code snippets in various programming languages and frameworks.
    </icon-card>
</icon-grid>

## Getting Started Examples

### Basic Identity Operations

<div class="icon-grid grid-cols-2">
  <div class="icon-card">
    <div class="icon">🆔</div>
    <h3>Identity Creation</h3>
    <p>Learn how to create a new Dash Platform Identity connected to EvoNext.</p>
  </div>
  <div class="icon-card">
    <div class="icon">✅</div>
    <h3>Identity Verification</h3>
    <p>Verify and validate existing Dash Identities before integrating with EvoNext.</p>
  </div>
</div>

```javascript
// Creating a new Dash Platform Identity
const createIdentity = async () => {
    try {
        // Connect to EvoNext
        const client = new EvoNextClient();
        await client.connect();

        // Create a new identity
        const identity = await client.platform.identities.register();

        console.log('Identity created:', identity.getId());
        return identity;
    } catch (error) {
        console.error('Failed to create identity:', error);
        throw error;
    }
};
```

### Profile Management

<icon-grid columns={2}>
    <icon-card icon="👤" title="Profile Creation">
        Create a new EvoNext user profile with basic information.
    </icon-card>
    <icon-card icon="🔧" title="Profile Updates">
        Modify existing profile information with proper validation.
    </icon-card>
</icon-grid>

```javascript
// Creating an EvoNext profile
const createProfile = async (identityId, username, bio) => {
    try {
        const client = new EvoNextClient();
        const profileDocument = await client.platform.documents.create(
            'evoNext.profileContract',
            identityId,
            {
                profile: {
                    username,
                    bio,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                }
            }
        );

        // Submit the document to the platform
        await client.platform.documents.broadcast(profileDocument);

        return profileDocument;
    } catch (error) {
        console.error('Failed to create profile:', error);
        throw error;
    }
};
```

## EvoApp Development Examples

### Creating a Simple EvoApp

<icon-grid columns={3}>
    <icon-card icon="🏗️" title="Basic Structure">
        Set up the fundamental components of an EvoApp.
    </icon-card>
    <icon-card icon="📱" title="UI Components">
        Build responsive user interfaces for EvoApps.
    </icon-card>
    <icon-card icon="🔗" title="Backend Integration">
        Connect your EvoApp to the Dash Platform backend.
    </icon-card>
</icon-grid>

```html
<!-- Basic EvoApp HTML Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My EvoApp</title>
    <script src="https://unpkg.com/@dashevo/dashcore-lib@latest/dist/dashcore-lib.min.js"></script>
    <script src="https://unpkg.com/@dashevo/dapi-client@latest/dist/index.min.js"></script>
    <script src="https://unpkg.com/evonext-sdk@latest/dist/evonext.min.js"></script>
</head>
<body>
    <div id="app">
        <header>
            <h1>My EvoApp</h1>
            <div id="user-info"></div>
        </header>
        <main>
            <section id="app-content"></section>
        </main>
    </div>

    <script>
        // EvoApp initialization
        document.addEventListener('DOMContentLoaded', async () => {
            try {
                // Initialize EvoNext SDK
                const evonext = new EvoNext.Mainnet();
                await evonext.initialize();

                // Check if user is logged in
                const isLoggedIn = await evonext.account.isLoggedIn();
                if (isLoggedIn) {
                    displayUserInfo();
                    loadAppContent();
                } else {
                    showLoginButton();
                }
            } catch (error) {
                console.error('Failed to initialize EvoApp:', error);
                document.getElementById('app-content').innerHTML =
                    '<p>Error loading application. Please try again later.</p>';
            }
        });

        async function displayUserInfo() {
            const profile = await evonext.account.getProfile();
            document.getElementById('user-info').innerHTML = `
                <div class="user-profile">
                    <img src="${profile.avatar || 'default-avatar.png'}" alt="${profile.username}">
                    <span>${profile.username}</span>
                </div>
            `;
        }

        function showLoginButton() {
            document.getElementById('app-content').innerHTML = `
                <div class="login-prompt">
                    <h2>Login to EvoNext</h2>
                    <button id="login-btn">Connect with EvoNext</button>
                </div>
            `;

            document.getElementById('login-btn').addEventListener('click', login);
        }

        async function login() {
            try {
                await evonext.account.login();
                location.reload(); // Reload to show logged-in state
            } catch (error) {
                console.error('Login failed:', error);
                alert('Login failed. Please try again.');
            }
        }

        async function loadAppContent() {
            // Load your EvoApp specific content here
            document.getElementById('app-content').innerHTML = `
                <h2>Welcome to your EvoNext dashboard!</h2>
                <p>Here's where your app content would go.</p>
            `;
        }
    </script>
</body>
</html>
```

### EvoApp Registration

<icon-grid columns={2}>
    <icon-card icon="📝" title="App Registration">
        Register your EvoApp with the Dash Network.
    </icon-card>
    <icon-card icon="📤" title="App Deployment">
        Deploy your EvoApp to Dash Drive hosting.
    </icon-card>
</icon-grid>

```javascript
// Registering an EvoApp
const registerEvoApp = async (identityId, appInfo) => {
    try {
        const client = new EvoNextClient();

        // Create app registration document
        const appDocument = await client.platform.documents.create(
            'evoApp.appContract',
            identityId,
            {
                app: {
                    name: appInfo.name,
                    description: appInfo.description,
                    version: appInfo.version,
                    developerId: identityId,
                    category: appInfo.category,
                    assets: {
                        icon: appInfo.iconUrl,
                        screenshots: appInfo.screenshots
                    },
                    dashDrive: {
                        domain: appInfo.domain,
                        contractId: appInfo.contractId,
                        documents: appInfo.documents
                    },
                    permissions: appInfo.permissions,
                    createdAt: Date.now()
                }
            }
        );

        // Submit the document to the platform
        await client.platform.documents.broadcast(appDocument);

        console.log(`EvoApp "${appInfo.name}" registered successfully!`);
        return appDocument;
    } catch (error) {
        console.error('Failed to register EvoApp:', error);
        throw error;
    }
};

// Example usage
const appInfo = {
    name: "My Awesome EvoApp",
    description: "A demonstration EvoApp that showcases EvoNext capabilities",
    version: "1.0.0",
    category: "utility",
    iconUrl: "https://dashdrive.example.com/my-app/icon.png",
    screenshots: [
        "https://dashdrive.example.com/my-app/screenshot1.png",
        "https://dashdrive.example.com/my-app/screenshot2.png"
    ],
    domain: "my-app.dash",
    contractId: "5a7b8c9d0e1f2a3b4c5d6e7f8g9h0i1j2k3l4m5",
    documents: ["main", "settings", "dashboard"],
    permissions: {
        profile: "read",
        identity: "read",
        dashPay: "write"
    }
};

// First create or retrieve your identity
const identity = await createIdentity();
// Then register your app
const registeredApp = await registerEvoApp(identity.getId(), appInfo);
```

## Integration Examples

### Third-Party Service Integration

<icon-grid columns={2}>
    <icon-card icon="🔗" title="Service Connection">
        Connect EvoNext with external services and APIs.
    </icon-card>
    <icon-card icon="📊" title="Data Synchronization">
        Sync data between EvoNext and other platforms.
    </icon-card>
</icon-grid>

```javascript
// Example: Integrating with a third-party payment processor
const setupPaymentProcessor = async () => {
    try {
        // Get EvoNext identity
        const client = new EvoNextClient();
        await client.connect();

        const identityId = await client.account.getIdentityId();

        // Create integration document
        const integration = await client.platform.documents.create(
            'evoNext.integrationContract',
            identityId,
            {
                integration: {
                    type: 'payment-processor',
                    provider: 'example-payment-service',
                    configuration: {
                        apiKey: 'encrypted-api-key',
                        merchantId: 'merchant123',
                        sandbox: true
                    },
                    permissions: [
                        'process-payments',
                        'refund-payments',
                        'view-transactions'
                    ],
                    createdAt: Date.now()
                }
            }
        );

        // Submit to platform
        await client.platform.documents.broadcast(integration);

        // Set up webhooks or other connection methods
        await setupWebhooks(integration.getId());

        console.log('Payment processor integration set up successfully');
        return integration;
    } catch (error) {
        console.error('Failed to set up payment processor:', error);
        throw error;
    }
};
```

### Content Management Example

<icon-grid columns={2}>
    <icon-card icon="📝" title="Blog Platform">
        Build a decentralized blog on EvoNext.
    </icon-card>
    <icon-card icon="🖼️" title="Media Gallery">
        Create a decentralized media gallery on Dash Drive.
    </icon-card>
</icon-grid>

```javascript
// Example: Creating a decentralized blog post
const createBlogPost = async (title, content, tags) => {
    try {
        const client = new EvoNextClient();
        await client.connect();

        const identityId = await client.account.getIdentityId();

        // Create blog post document
        const blogPost = await client.platform.documents.create(
            'decentralizedBlog.postContract',
            identityId,
            {
                post: {
                    title,
                    content,
                    tags,
                    authorId: identityId,
                    published: false,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                }
            }
        );

        // Submit to platform
        await client.platform.documents.broadcast(blogPost);

        console.log('Blog post created successfully');
        return blogPost;
    } catch (error) {
        console.error('Failed to create blog post:', error);
        throw error;
    }
};

// Example: Publishing the blog post
const publishBlogPost = async (postId) => {
    try {
        const client = new EvoNextClient();
        await client.connect();

        // Get the blog post
        const blogPost = await client.platform.documents.get('decentralizedBlog.postContract', postId);

        // Update to publish
        blogPost.data.post.published = true;
        blogPost.data.post.updatedAt = Date.now();

        // Submit update
        await client.platform.documents.broadcast(blogPost);

        console.log('Blog post published successfully');
        return blogPost;
    } catch (error) {
        console.error('Failed to publish blog post:', error);
        throw error;
    }
};
```

## Troubleshooting Examples

### Common Development Issues

<icon-grid columns={2}>
    <icon-card icon="🐛" title="Debugging">
        Common debugging techniques and tools.
    </icon-card>
    <icon-card icon="🔧" title="Error Handling">
        Best practices for error handling in EvoNext applications.
    </icon-card>
</icon-grid>

```javascript
// Example: Robust error handling for EvoNext operations
const safeEvoNextOperation = async (operation) => {
    try {
        // Setup retry mechanism for network issues
        const maxRetries = 3;
        let retryCount = 0;

        while (retryCount < maxRetries) {
            try {
                return await operation();
            } catch (error) {
                // Check if it's a network error that might be resolved by retrying
                if (isNetworkError(error) && retryCount < maxRetries - 1) {
                    retryCount++;
                    console.log(`Network error, retrying (${retryCount}/${maxRetries})...`);
                    // Exponential backoff
                    await new Promise(resolve => setTimeout(resolve, 1000 * 2**retryCount));
                    continue;
                }
                throw error;
            }
        }
    } catch (error) {
        // Log detailed error information
        console.error('EvoNext operation failed:', {
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });

        // User-friendly error message
        if (isIdentityError(error)) {
            throw new Error('Identity error: Please check your Dash Identity and try again.');
        } else if (isInsufficientFundsError(error)) {
            throw new Error('Insufficient funds: Please ensure you have enough Dash to complete this operation.');
        } else if (isNetworkError(error)) {
            throw new Error('Network error: Please check your connection and try again.');
        } else {
            throw new Error('An unexpected error occurred. Please try again later.');
        }
    }
};

// Helper functions for error classification
function isNetworkError(error) {
    return error.message.includes('network') ||
           error.message.includes('connection') ||
           error.message.includes('timeout');
}

function isIdentityError(error) {
    return error.message.includes('identity') ||
           error.message.includes('authentication');
}

function isInsufficientFundsError(error) {
    return error.message.includes('insufficient funds') ||
           error.message.includes('balance');
}
```

## Next Steps

<icon-grid columns={2}>
    <icon-card icon="📖" title="Full Documentation">
        Explore our complete documentation for in-depth information on EvoNext development.
    </icon-card>
    <icon-card icon="💬" title="Community Support">
        Join our community to ask questions and share your EvoNext experiences.
    </icon-card>
</icon-grid>

Ready to build your own EvoNext application? Check out our [Developer Resources](../developer/quick-start) for comprehensive guides and API references.
