# Circle API HTTP Module Configuration

## Request Settings
- URL: https://api.circle.com/v1/w3s/developer/transactions/transfer
- Method: POST
- Headers:
  - Authorization: Bearer YOUR_API_KEY
  - Content-Type: application/json

## Body
```json
{
  "idempotencyKey": "{{uuid()}}",
  "amounts": [".06"],
  "destinationAddress": "0x43fb5e5bd0670ebb45467bd45a7dc3bd60150481",
  "entitySecretCiphertext": "{{1.entitySecretCiphertext}}",
  "feeLevel": "MEDIUM",
  "walletId": "83dbad0d-1702-5cf6-9927-991fcf146645",
  "tokenId": "5797fbd6-3795-519d-84ca-ec4c5f80c3b1"
}
