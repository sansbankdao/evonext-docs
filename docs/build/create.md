---
# docs/build/create.md

sidebar_position: 2
---

# Create an Evo (Mini) App
This guide provides a comprehensive walkthrough for developers looking to create an Evo (Mini) App designed to run within an iFrame on the EvoNext social network. Evo (Mini) Apps are lightweight applications that leverage the power of Dash Platform while offering enhanced functionality and interactivity to users.
<icon-grid columns={2}>
    <icon-card icon="🚀" title="Fast & Lightweight">
        Evo (Mini) Apps load quickly and run efficiently within the EvoNext ecosystem.
    </icon-card>
    <icon-card icon="🔗" title="Platform Integration">
        Seamlessly connect with Dash Platform features while maintaining your app's unique functionality.
    </icon-card>
</icon-grid>

## Prerequisites
Before you begin, ensure you have:
<div class="icon-grid grid-cols-2">
  <div class="icon-card">
    <div class="icon">💻</div>
    <h3>Development Skills</h3>
    <p>Basic knowledge of HTML, CSS, and JavaScript.</p>
  </div>
  <div class="icon-card">
    <div class="icon">🛠️</div>
    <h3>Development Tools</h3>
    <p>A code editor (e.g., Visual Studio Code) and a modern browser.</p>
  </div>
  <div class="icon-card">
    <div class="icon">🆔</div>
    <h3>Dash Platform Identity</h3>
    <p>A registered Dash Identity to interact with the platform.</p>
  </div>
  <div class="icon-card">
    <div class="icon">📋</div>
    <h3>EvoNext Account</h3>
    <p>Access to the EvoNext Developer Portal with a developer account.</p>
  </div>
</div>

## Step 1: Set Up Your Development Environment/
### Install Required Tools

1. **Install a Code Editor**: If you haven't already, download and install Visual Studio Code with these helpful extensions:
    - Live Server
    - Prettier
    - ES7+ React/Redux/React-Native snippets

2. **Create a New Project Folder**: Organize your project files by creating a dedicated folder for your Evo (Mini) App.

3. **Initialize Your Project**:
```bash
    mkdir my-evo-app
    cd my-evo-app
    npm init -y
    npm install @evonext/sdk
    ```


## Step 2: Create the Basic App Structure
Create the following files in your project folder:
```
my-evo-app/
│
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # Main JavaScript file
├── evonext.js          # EvoNext integration
├── package.json        # Project configuration
└── assets/             # Static assets
    ├── images/
    └── icons/
```


## Step 3: Develop Your EvoApp

### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My EvoApp</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <header class="app-header">
            <h1>Welcome to My EvoApp!</h1>
            <div id="user-info" class="hidden">
                <img id="user-avatar" src="" alt="User Avatar">
                <span id="user-name"></span>
            </div>
        </header>
        <main class="app-content">
            <section class="app-description">
                <p>This is a sample app running within an iFrame on EvoNext.</p>
            </section>
            <section id="login-section" class="auth-section">
                <button id="login-btn" class="primary-btn">Connect with EvoNext</button>
            </section>
            <section id="app-features" class="app-features hidden">
                <h2>App Features</h2>
                <div class="feature-grid">
                    <div class="feature-card">
                        <h3>Feature 1</h3>
                        <p>Description of feature 1</p>
                        <button id="feature1-btn" class="secondary-btn">Try Feature 1</button>
                    </div>
                    <div class="feature-card">
                        <h3>Feature 2</h3>
                        <p>Description of feature 2</p>
                        <button id="feature2-btn" class="secondary-btn">Try Feature 2</button>
                    </div>
                </div>
            </section>
        </main>
    </div>
    <!-- Scripts -->
    <script src="https://unpkg.com/@dashevo/dashcore-lib@latest/dist/dashcore-lib.min.js"></script>
    <script src="https://unpkg.com/@evonext/sdk@latest/dist/evonext.min.js"></script>
    <script src="evonext.js"></script>
    <script src="script.js"></script>
</body>
</html>
```
### styles.css
```css
/* styles.css */
:root {
    --primary-color: #0084ff;
    --secondary-color: #f0f0f0;
    --text-color: #333;
    --background-color: #ffffff;
    --card-background: #f9f9f9;
    --border-color: #e1e1e1;
}
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    margin: 0;
    padding: 0;
    line-height: 1.6;
}
#app {
    max-width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.app-header {
    background-color: var(--primary-color);
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.app-header h1 {
    margin: 0;
    font-size: 1.5rem;
}
#user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
#user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}
.app-content {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
}
.auth-section {
    text-align: center;
    margin: 2rem 0;
}
.primary-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s;
}
.primary-btn:hover {
    background-color: #0066cc;
}
.secondary-btn {
    background-color: var(--secondary-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
}
.secondary-btn:hover {
    background-color: #e0e0e0;
}
.app-features {
    margin-top: 2rem;
}
.feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}
.feature-card {
    background-color: var(--card-background);
    border-radius: 8px;
    padding: 1rem;
    border: 1px solid var(--border-color);
}
.feature-card h3 {
    margin-top: 0;
    color: var(--primary-color);
}
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #4CAF50;
    color: white;
    padding: 1rem;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transform: translateX(150%);
    transition: transform 0.3s ease-in-out;
}
.notification.show {
    transform: translateX(0);
}
.notification.error {
    background-color: #f44336;
}
.hidden {
    display: none;
}
```
### evonext.js
```javascript
// evonext.js - EvoNext integration
const EvoNextIntegration = (function() {
    let isConnected = false;
    let userProfile = null;
    let evonextSDK = null;
    // Initialize EvoNext SDK
    async function initialize() {
        try {
            // Check if running inside EvoNext iframe
            if (window.location !== window.parent.location) {
                // Initialize EvoNext SDK for iframe environment
                if (window.EvoNextSDK) {
                    evonextSDK = new window.EvoNextSDK();
                    await evonextSDK.initialize();
                    return true;
                }
            } else {
                // Standalone mode - create a mock SDK for testing
                evonextSDK = {
                    login: async function() {
                        return new Promise((resolve) => {
                            // Simulate login for development
                            setTimeout(() => {
                                userProfile = {
                                    username: 'testuser',
                                    avatar: 'https://picsum.photos/seed/testuser/50/50.jpg'
                                };
                                resolve(userProfile);
                            }, 1000);
                        });
                    },
                    getUserProfile: async function() {
                        return userProfile;
                    },
                    sendDocument: async function(contractId, documentType, data) {
                        // Mock document submission
                        return {
                            success: true,
                        };
                    },
                    getContract: async function(contractId) {
                        // Mock contract retrieval
                        return {
                            name: 'Mock Contract'
                        };
                    }
                };
                return true;
            }
        } catch (error) {
            console.error('Failed to initialize EvoNext SDK:', error);
            return false;
        }
    }
    // Login function
    async function login() {
        try {
            userProfile = await evonextSDK.login();
            isConnected = true;
            updateUIForLoggedInUser();
            return userProfile;
        } catch (error) {
            showNotification('Login failed: ' + error.message, 'error');
            throw error;
        }
    }
    // Update UI when user is logged in
    function updateUIForLoggedInUser() {
        document.getElementById('user-name').textContent = userProfile.username;
        document.getElementById('user-avatar').src = userProfile.avatar;
        document.getElementById('user-info').classList.remove('hidden');
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('app-features').classList.remove('hidden');
    }
    // Show notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    // Get documents from a contract
    async function getDocuments(contractId, documentType, query = {}) {
        try {
            const documents = await evonextSDK.getDocuments(contractId, documentType, query);
            return documents;
        } catch (error) {
            showNotification('Failed to retrieve documents: ' + error.message, 'error');
            throw error;
        }
    }
    // Send a document to a contract
    async function sendDocument(contractId, documentType, data) {
        try {
            const result = await evonextSDK.sendDocument(contractId, documentType, data);
            showNotification('Document submitted successfully!');
            return result;
        } catch (error) {
            showNotification('Failed to submit document: ' + error.message, 'error');
            throw error;
        }
    }
    // Public API
    return {
        initialize,
        login,
        isConnected: () => isConnected,
        getUserProfile: () => userProfile,
        showNotification,
        getDocuments,
        sendDocument
    };
})();
```
### script.js
```javascript
// script.js - Main application logic
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Initialize EvoNext integration
        const initialized = await EvoNextIntegration.initialize();
        if (initialized) {
            // Set up event listeners
            document.getElementById('login-btn').addEventListener('click', handleLogin);
            document.getElementById('feature1-btn').addEventListener('click', handleFeature1);
            document.getElementById('feature2-btn').addEventListener('click', handleFeature2);
            // Check if user is already logged in
            const userProfile = await EvoNextIntegration.getUserProfile();
            if (userProfile) {
                EvoNextIntegration.updateUIForLoggedInUser();
            }
        } else {
            EvoNextIntegration.showNotification('Failed to initialize EvoNext integration', 'error');
        }
    } catch (error) {
        console.error('App initialization failed:', error);
        EvoNextIntegration.showNotification('App initialization failed', 'error');
    }
});
// Login handler
async function handleLogin() {
    try {
        await EvoNextIntegration.login();
    } catch (error) {
        console.error('Login error:', error);
    }
}
// Feature 1 handler - Example: Retrieve user's documents
async function handleFeature1() {
    try {
        // Example: Get documents from a contract
        const contractId = 'your-contract-id';
        const documentType = 'document-type';
        const documents = await EvoNextIntegration.getDocuments(contractId, documentType);
        if (documents && documents.length > 0) {
            EvoNextIntegration.showNotification(`Found ${documents.length} documents`);
            console.log('Documents:', documents);
        } else {
            EvoNextIntegration.showNotification('No documents found');
        }
    } catch (error) {
        console.error('Feature 1 error:', error);
    }
}
// Feature 2 handler - Example: Send a document
async function handleFeature2() {
    try {
        // Example: Send a document to a contract
        const contractId = 'your-contract-id';
        const documentType = 'document-type';
        const documentData = {
            field1: 'value1',
            field2: 'value2',
            timestamp: Date.now()
        };
        const result = await EvoNextIntegration.sendDocument(contractId, documentType, documentData);
        console.log('Document result:', result);
    } catch (error) {
        console.error('Feature 2 error:', error);
    }
}
```
## Step 4: Test Your App Locally
1. Open your code editor and ensure all files are saved.
2. For local testing, you can use the Live Server extension in VS Code or use Python's built-in server:
```bash
    # Using Python 3
    python -m http.server 8000
    # Using Python 2
    python -m SimpleHTTPServer 8000
    ```
3. Open your browser and navigate to`http://localhost:8000`.
4. Test all functionalities to ensure they work as expected.
## Step 5: Prepare for Deployment
### Optimize Performance
1. **Minify CSS and JavaScript**:
```bash
    # Using npm packages
    npm install -g clean-css-cli uglify-js
    # Minify CSS
    cleancss -o styles.min.css styles.css
    # Minify JavaScript
    uglifyjs evonext.js script.js -o scripts.min.js
    ```
2. **Update HTML to use minified files**:
```html
    <link rel="stylesheet" href="styles.min.css">
    <script src="scripts.min.js"></script>
    ```
3. **Optimize Images**: Compress images and use modern formats like WebP when supported.
### Cross-Browser Testing
Test your app on different browsers to ensure compatibility:
<icon-grid columns={3}>
    <icon-card icon="🌐" title="Chrome">
        Primary development environment with robust developer tools.
    </icon-card>
    <icon-card icon="🦊" title="Firefox">
        Excellent standards compliance and debugging capabilities.
    </icon-card>
    <icon-card icon="🔵" title="Safari">
        Important for iOS compatibility testing.
    </icon-card>
</icon-grid>
## Step 6: Deploy Your App
### Options for Deployment
<div class="icon-grid grid-cols-2">
  <div class="icon-card">
    <div class="icon">🌍</div>
    <h3>Traditional Web Hosting</h3>
    <p>Upload your app files to a web server using FTP or a control panel.</p>
  </div>
  <div class="icon-card">
    <div class="icon">📦</div>
    <h3>Static Site Hosting</h3>
    <p>Deploy to services like Netlify, Vercel, or GitHub Pages.</p>
  </div>
</div>
### Deploy to Dash Drive (Recommended)
For full integration with the Dash Platform, deploy your EvoApp to Dash Drive:
1. Follow our [Deploy Your App](./deploy) guide for detailed instructions.
2. Create a deployment script:
```javascript
    // deploy.js
    const { EvoNext } = require('@evonext/sdk');
    const fs = require('fs');
    const path = require('path');
    async function deployToDashDrive() {
        // Initialize EvoNext SDK
        const sdk = new EvoNext('mainnet'); // or 'testnet'
        await sdk.connect();
        // Initialize your project
        await sdk.initializeProject('./my-evo-app');
        // Deploy to Dash Drive
        const result = await sdk.deploy();
        console.log('App deployed to:', result.url);
        console.log('App ID:', result.appId);
    }
    deployToDashDrive().catch(console.error);
    ```
## Step 7: Register Your App on EvoNext
1. **Navigate to the Developer Portal**: Go to [EvoNext Developer Portal](https://evonext.app/developer) and log in.
2. **Create a New App**: Click on "Create New App" and fill in the required details:
    - App Name
    - Description
    - Category
    - URL of your hosted app
    - App Icon
    - Screenshots
3. **Configure App Permissions**: Select the permissions your app needs:
    - Identity Read/Write
    - Document Read/Write
    - Contract Read/Write
4. **Submit for Review**: Submit your app for review. The EvoNext team will review your app and provide feedback or approval.
## Step 8: Integrate with EvoNext
### iFrame Testing
Test your app in an iframe environment:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EvoNext App Test</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        .iframe-container {
            border: 1px solid #ddd;
            width: 100%;
            max-width: 1200px;
            height: 800px;
            margin: 0 auto;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <h1>EvoApp iFrame Test</h1>
    <div class="iframe-container">
        <iframe src="https://your-app-url.com" title="EvoApp"></iframe>
    </div>
</body>
</html>
```
### Communication with EvoNext
Enhance your app's integration using the EvoNext JavaScript API:
```javascript
// Example: Send a message to the parent EvoNext window
function sendToParent(messageType, data) {
    if (window.parent !== window) {
        window.parent.postMessage({
            type: messageType,data,
            source: 'evoapp'
        }, '*');
    }
}
// Example: Listen for messages from the parent EvoNext window
window.addEventListener('message', function(event) {
    // Verify the message origin for security
    if (event.origin !== 'https://evonext.app') {
        return;
    }
    // Handle different message types
    switch (event.data.type) {
        case 'user-authenticated':
            // Update UI when user is authenticated
            updateUI(event.data.user);
            break;
        case 'theme-changed':
            // Adjust app styling to match the theme
            updateTheme(event.data.theme);
            break;
        case 'resize':
            // Adjust iframe size if necessary
            resizeApp(event.data.width, event.data.height);
            break;
    }
});
// Example: Request user data from EvoNext
function requestUserData() {
    sendToParent('request-user-data', {});
}
```
## Step 9: Monitor and Update
### Implement Analytics
Add analytics to track user engagement:
```javascript
// analytics.js - Simple analytics for your EvoApp
const EVOAppAnalytics = (function() {
    const apiEndpoint = 'https://your-analytics-api.com/events';
    function track(eventName, properties = {}) {
        const eventData = {
            app: 'your-app-id',
            properties,
            timestamp: Date.now(),
            url: window.location.href
        };
        // Send data to analytics endpoint
        if (navigator.sendBeacon) {
            // Use sendBeacon for better performance
            navigator.sendBeacon(apiEndpoint, JSON.stringify(eventData));
        } else {
            // Fallback to fetch
            fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            }).catch(console.error);
        }
    }
    // Track common events
    function trackPageView() {
        track('page_view', {
            path: window.location.pathname,
            title: document.title
        });
    }
    function trackFeatureUsage(featureName, properties = {}) {
        track('feature_used', {
            feature: featureName,
            ...properties
        });
    }
    function trackError(error, context = {}) {
        track('error', {
            message: error.message,
            stack: error.stack,
            ...context
        });
    }
    // Initialize analytics
    document.addEventListener('DOMContentLoaded', function() {
        trackPageView();
        // Track errors globally
        window.addEventListener('error', function(event) {
            trackError(event.error, {
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });
    });
    return {
        track,
        trackPageView,
        trackFeatureUsage,
        trackError
    };
})();
// Usage example in your app code
document.getElementById('feature1-btn').addEventListener('click', function() {
    // Track feature usage
    EVOAppAnalytics.trackFeatureUsage('feature1', {
        user_action: 'button_click'
    });
    // Continue with feature logic
    handleFeature1();
});
```
### User Feedback Collection
Implement a feedback mechanism:
```javascript
// feedback.js - User feedback system
const EVOAppFeedback = (function() {
    let feedbackForm = null;
    function createFeedbackForm() {
        feedbackForm = document.createElement('div');
        feedbackForm.innerHTML = `
            <div class="feedback-overlay">
                <div class="feedback-form">
                    <h3>Send Feedback</h3>
                    <textarea id="feedback-message" placeholder="Tell us what you think..."></textarea>
                    <div class="rating-container">
                        <label>How would you rate this app?</label>
                        <div class="star-rating">
                            <span class="star" data-rating="1">☆</span>
                            <span class="star" data-rating="2">☆</span>
                            <span class="star" data-rating="3">☆</span>
                            <span class="star" data-rating="4">☆</span>
                            <span class="star" data-rating="5">☆</span>
                        </div>
                    </div>
                    <div class="feedback-actions">
                        <button id="submit-feedback" class="primary-btn">Submit</button>
                        <button id="cancel-feedback" class="secondary-btn">Cancel</button>
                    </div>
                </div>
            </div>
        `;
        // Style the feedback form
        const style = document.createElement('style');
        style.textContent = `
            .feedback-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            .feedback-form {
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .feedback-form h3 {
                margin-top: 0;
                color: var(--primary-color);
            }
            .feedback-form textarea {
                width: 100%;
                height: 100px;
                margin-bottom: 15px;
                padding: 10px;
                border: 1px solid var(--border-color);
                border-radius: 4px;
                resize: none;
            }
            .star-rating {
                margin: 10px 0;
            }
            .star {
                font-size: 24px;
                cursor: pointer;
                color: #ccc;
            }
            .star.active {
                color: #f5c518;
            }
            .feedback-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(feedbackForm);
        // Add event listeners
        document.getElementById('submit-feedback').addEventListener('click', submitFeedback);
        document.getElementById('cancel-feedback').addEventListener('click', closeFeedbackForm);
        // Handle star rating
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.getAttribute('data-rating'));
                // Update star display
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('active');
                        s.textContent = '★';
                    } else {
                        s.classList.remove('active');
                        s.textContent = '☆';
                    }
                });
            });
        });
    }
    function submitFeedback() {
        const message = document.getElementById('feedback-message').value;
        const rating = document.querySelectorAll('.star.active').length;
        if (message.trim() === '') {
            alert('Please provide feedback before submitting.');
            return;
        }
        // Send feedback to server
        fetch('https://your-api.com/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                app: 'your-app-id',
                message,
                rating,
                timestamp: Date.now()
            })
        })
        .then(response => response.json())
        .then(data => {
            EvoNextIntegration.showNotification('Thank you for your feedback!');
            closeFeedbackForm();
        })
        .catch(error => {
            console.error('Error submitting feedback:', error);
            EvoNextIntegration.showNotification('Failed to submit feedback. Please try again.', 'error');
        });
    }
    function closeFeedbackForm() {
        if (feedbackForm) {
            document.body.removeChild(feedbackForm);
            feedbackForm = null;
        }
    }
    function showFeedbackForm() {
        if (!feedbackForm) {
            createFeedbackForm();
        }
    }
    return {
        showFeedbackForm
    };
})();
// Add a feedback button to your app
document.addEventListener('DOMContentLoaded', function() {
    const feedbackButton = document.createElement('button');
    feedbackButton.innerHTML = 'Feedback';
    feedbackButton.className = 'secondary-btn feedback-btn';
    feedbackButton.style.position = 'fixed';
    feedbackButton.style.bottom = '20px';
    feedbackButton.style.right = '20px';
    feedbackButton.addEventListener('click', EVOAppFeedback.showFeedbackForm);
    document.body.appendChild(feedbackButton);
});
```
## Conclusion
You've now created a fully functional Evo (Mini) App with integration to the EvoNext social network. Your app can:
<icon-grid columns={2}>
    <icon-card icon="🔗" title="Platform Integration">
        Seamlessly connect with Dash Platform features while maintaining your app's unique functionality.
    </icon-card>
    <icon-card icon="📊" title="User Analytics">
        Track user engagement and gather feedback to improve your application.
    </icon-card>
    <icon-card icon="🔄" title="Two-Way Communication">
        Exchange data with EvoNext through iframe messaging and API calls.
    </icon-card>
    <icon-card icon="🌍" title="Decentralized Hosting">
        Deploy your app to Dash Drive for permanent, censorship-resistant hosting.
    </icon-card>
</icon-grid>
Ready to take your app to the next level? Check out our [Deploy Your App](./deploy) guide to publish to Dash Drive, or explore our [Examples](./examples) for more advanced implementations.
