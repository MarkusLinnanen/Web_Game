import requests

url = "https://fish-species.p.rapidapi.com/fish_api/fishes"

headers = {
	"X-RapidAPI-Key": "e2c31f7fbcmshf332c3d61a107abp150a7cjsna923559e3541",
	"X-RapidAPI-Host": "fish-species.p.rapidapi.com"
}

response = requests.get(url, headers=headers)

print(response.json())