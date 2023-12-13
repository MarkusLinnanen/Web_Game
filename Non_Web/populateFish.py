import json
import mysql.connector

cnx = mysql.connector.connect(user='userguy', password='pw0rd',
                              host='localhost',
                              database='fishbase')
cursor = cnx.cursor(dictionary = True)

def getFishDict():
    readJson = open("../JSON/kalat.json")
    readDict = json.load(readJson)
    readJson.close()
    return(readDict)

def fillFishTable(fishDict):
    global cursor, cnx
    cursor.execute("DELETE FROM fish")
    cnx.commit()
    for i in fishDict:
        cursor.execute("INSERT INTO fish (name, imageLink, country, ID) VALUES (%s, %s, %s, %s)", (i["name"], i["img_src_set"]["1.5x"], "Finland", i["id"]))
    cnx.commit()


gfd = getFishDict()
print(gfd)
fillFishTable(gfd)