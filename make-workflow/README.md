# Make.com Workflow Components

This folder contains documentation and code for the Make.com workflow that processes page refresh events from zkp.fun/leaderboard and interacts with the Circle API.

## Files in This Folder

- **js-module.js**: JavaScript code for the Custom JS module that generates and encrypts the Entity Secret
- **http-module.md**: Documentation for the HTTP module configuration that sends requests to Circle API
- **webhook-module.md**: Documentation for the webhook trigger configuration that receives events from the Chrome extension

## Workflow Overview

1. **Webhook Trigger**: Receives notifications when zkp.fun/leaderboard is refreshed
2. **Custom JS Module**: Generates and encrypts an Entity Secret using RSA-OAEP encryption
3. **HTTP Module**: Sends the encrypted Entity Secret to Circle's API for wallet transactions

## Setup Instructions

1. Create a new scenario in Make.com
2. Add a Webhook trigger and copy the generated webhook URL
3. Add a JavaScript module and paste the code from js-module.js
4. Add an HTTP module configured as described in http-module.md
5. Activate your scenario
6. Update the webhook URL in your Chrome extension

## Security Considerations

- The Entity Secret should be treated as sensitive information
- In a production environment, consider storing the Entity Secret securely rather than hardcoding it
- The API key for Circle should be stored using Make.com's credential system
