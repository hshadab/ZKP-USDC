// Your Make.com webhook URL
const WEBHOOK_URL = 'https://hook.us2.make.com/n1pqbket9chxitfjnelxoiylnah8abls';

// Track when we last sent a webhook to avoid duplicates
let lastWebhookTime = 0;
const COOLDOWN_PERIOD_MS = 5000; // 5 seconds cooldown

// Listen for page refreshes and navigation to the leaderboard
chrome.webNavigation.onCompleted.addListener((details) => {
  // Check if this is the main frame (not an iframe)
  if (details.frameId !== 0) return;
  
  // Check if the URL matches our target
  if (!details.url.includes('zkp.fun/leaderboard')) return;
  
  // Implement cooldown to prevent multiple triggers
  const now = Date.now();
  if (now - lastWebhookTime < COOLDOWN_PERIOD_MS) return;
  
  // Update cooldown timestamp
  lastWebhookTime = now;
  
  // Send the webhook to Make.com
  sendWebhook(details.url);
}, {
  url: [{ hostContains: 'zkp.fun' }]
});

// Function to send the webhook
function sendWebhook(url) {
  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      event: 'page_refresh',
      url: url,
      timestamp: new Date().toISOString()
    })
  })
  .then(response => {
    console.log('Webhook sent successfully', response.status);
  })
  .catch(error => {
    console.error('Error sending webhook:', error);
  });
}

// Log when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  console.log('ZKP.fun Leaderboard Monitor installed');
});
