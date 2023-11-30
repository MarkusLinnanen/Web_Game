import json
import requests

url = "https://fish-species.p.rapidapi.com/fish_api/fishes"

headers = {
	"X-RapidAPI-Key": "RAPID_API_KEY",
	"X-RapidAPI-Host": "fish-species.p.rapidapi.com"
}

response = requests.get(url, headers=headers)

with open("../JSON/AllFish.json", "w") as outfile:
    json.dump(response.json(), outfile)