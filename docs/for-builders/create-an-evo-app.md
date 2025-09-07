---
sidebar_position: 3
---

# Create an Evo (Mini) App


## Introduction

This guide provides a comprehensive walkthrough for developers looking to create an Evo (Mini) App designed to run within an iFrame on the EvoNext social network. Evo (Mini) Apps are lightweight applications that can be embedded into the EvoNext platform, offering enhanced functionality and interactivity to users.


## Prerequisites

Before you begin, ensure you have the following:

- Basic knowledge of HTML, CSS, and JavaScript.
- A code editor (e.g., Visual Studio Code, Sublime Text).
- Access to the EvoNext Developer Portal.
- An EvoNext developer account.


## Step 1: Set Up Your Development Environment

1. **Install a Code Editor**: If you haven't already, download and install a code editor like Visual Studio Code.
2. **Create a New Project Folder**: Organize your project files by creating a dedicated folder for your Evo (Mini) App.


## Step 2: Create the Basic App Structure

1. **Index.html**: Create an `index.html` file as the entry point of your app.
2. **Styles.css**: Create a `styles.css` file for styling your app.
3. **Script.js**: Create a `script.js` file for adding interactivity.

### Example Directory Structure

```
evo-mini-app/
│
├── index.html
├── styles.css
└── script.js
```


## Step 3: Develop the App

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Evo Mini App</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <h1>Welcome to My Evo Mini App!</h1>
        <p>This is a sample app running within an iFrame on EvoNext.</p>
        <button id="interactButton">Click Me!</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### styles.css

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    color: #333;
    margin: 0;
    padding: 0;
}

#app {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
```

### script.js

```javascript
document.getElementById('interactButton').addEventListener('click', function() {
    alert('Button clicked!');
});
```


## Step 4: Test Your App Locally

1. Open your code editor and ensure all files are saved.
2. Right-click on `index.html` and select "Open with Live Server" (if using Visual Studio Code with the Live Server extension).
3. Your app should now be running locally. Test all functionalities to ensure they work as expected.


## Step 5: Prepare for Deployment

1. **Optimize Performance**: Ensure your app is optimized for performance, including minifying CSS and JavaScript files.
2. **Cross-Browser Testing**: Test your app on different browsers to ensure compatibility.


## Step 6: Deploy Your App

1. **Upload Files**: Use an FTP client or your preferred method to upload your app files to your web server.
2. **Get the App URL**: Ensure you have the correct URL where your app is hosted.


## Step 7: Register Your App on EvoNext

1. **Log in to EvoNext Developer Portal**: Go to the EvoNext Developer Portal and log in with your developer account.
2. **Create a New App**: Click on "Create New App" and fill in the required details, including the app name, description, and the URL of your hosted app.
3. **Submit for Review**: Submit your app for review. EvoNext will review your app and provide feedback or approval.


## Step 8: Integrate with EvoNext

1. **iFrame Embedding**: Ensure your app can be embedded within an iFrame. Test this by embedding your app's URL in an iFrame on a local HTML page.
2. **Communicate with EvoNext**: Use EvoNext's JavaScript API to communicate with the parent window and access EvoNext's functionalities.

### Example iFrame Embedding

```html
<iframe src="https://your-app-url.com" width="600" height="400" style="border:none;"></iframe>
```


## Step 9: Monitor and Update

1. **User Feedback**: Collect user feedback and make necessary improvements.
2. **Regular Updates**: Keep your app updated with new features and bug fixes.


## Conclusion

You have successfully created an Evo (Mini) App and integrated it with the EvoNext social network. By following these steps, you can develop engaging and interactive apps that enhance the user experience on EvoNext.
