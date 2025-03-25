# ZKP-USDC
Trigger USDC transaction via API from NovaNet's in-browser zero knowledge proofs. 

# ZKP.fun Leaderboard Monitor

This project contains:

1. A Chrome extension that monitors the zkp.fun/leaderboard page and triggers a Make.com webhook when the page refreshes
2. A Make.com workflow that:
   - Receives the webhook
   - Generates an Entity Secret Ciphertext
   - Makes an API call to Circle's API

## Components

- **Chrome Extension**: Detects page refreshes and triggers the webhook
- **Make.com Webhook**: Receives notifications from the extension
- **Make.com JavaScript**: Generates and encrypts the Entity Secret
- **Make.com HTTP Module**: Sends the encrypted Entity Secret to Circle API

## Setup Instructions

### Chrome Extension
1. Clone this repository
2. Open Chrome and navigate to chrome://extensions/
3. Enable Developer Mode
4. Click "Load unpacked" and select the chrome-extension folder
5. Update the webhook URL in background.js with your Make.com webhook URL

### Make.com Workflow
1. Create a new scenario in Make.com
2. Add a Webhook trigger module and copy the webhook URL
3. Add a JavaScript module and paste the code from js-module.js
4. Add an HTTP module configured as described in http-module.md
5. Activate your scenario

## Usage
1. Visit zkp.fun/leaderboard
2. The page refresh will trigger your Make.com workflow
3. The workflow will generate an Entity Secret Ciphertext
4. The HTTP module will send it to Circle's API
