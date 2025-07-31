import requests
url="http://127.0.0.1:5000/get-weather"
data={"lat":28.61,"lon":77.23}
response=requests.post(url,json=data)
print(response.json())