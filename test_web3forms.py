import requests
import json

url = "https://api.web3forms.com/submit"
access_key = "082adb31-3c13-4ab5-b986-04c671f0d571"

payload = {
    "access_key": access_key,
    "name": "Test User",
    "email": "no-reply@a4aluminium.com",
    "subject": "Test message from local script",
    "message": "This is a test to verify Web3Forms API response."
}

try:
    r = requests.post(url, json=payload, timeout=15)
    print('Status:', r.status_code)
    try:
        print('Response JSON:')
        print(json.dumps(r.json(), indent=2))
    except Exception:
        print('Response text:')
        print(r.text)
except Exception as e:
    print('Error making request:', e)
