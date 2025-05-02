📌 Deployment:
- Hosted on Railway
- API URL : https://image-ocr-production.up.railway.app
- POST Endpoint: /api/ocr

📌 Input Format:
{
  "imageBase64": "data:image/png;base64,..."
}

📌 Output Format:
{
  "success": true,
  "data": {
    "name": "Jane Smith",
    "organization": "Beta Inc",
    "address": "456 Elm Ave",
    "mobile": "+1 555 5678"
  },
  "message": "Successfully extracted JSON from image"
}
