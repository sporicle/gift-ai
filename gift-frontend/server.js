const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Get the build path
const distPath = path.join(process.cwd(), 'dist/gift-frontend/browser');

console.log('Current directory:', process.cwd());
console.log('Dist path:', distPath);

// Serve static files from the dist directory
app.use(express.static(distPath));

// Add some logging middleware
app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    console.log('Dist path exists:', fs.existsSync(distPath));
    if (fs.existsSync(distPath)) {
        console.log('Dist contents:', fs.readdirSync(distPath));
    }
    next();
});

// Send all requests to index.html
app.get('/*', function(req, res) {
    const indexPath = path.join(distPath, 'index.html');
    console.log('Looking for index.html at:', indexPath);
    console.log('File exists:', fs.existsSync(indexPath));
    
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Application not built. Build artifacts not found.');
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});