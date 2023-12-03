import json
import mysql.connector

cnx = mysql.connector.connect(user='userguy', password='pw0rd',
                              host='localhost',
                              database='fishbase')
cursor = cnx.cursor(dictionary = True)

class player:
    def __init__(self, name):
        self.name = name
        # make the player row in the database
        cursor.execute("INSERT INTO player (name) VALUES (%s)", (self.name,))
        cnx.commit()
        cursor.execute("SELECT * FROM player WHERE name = %s", (self.name, ))
        self.vals = cursor.fetchall()[0]

    def getPole(self):
        cursor.execute("SELECT poleName, poleStrAmount, poleCond FROM player WHERE name = %s", (self.name,))
        return cursor.fetchall()[0]

    def getString(self):
        cursor.execute("SELECT string.name breakPercent FROM player, string WHERE player.name = %s AND string.name = player.string", (self.name,))
        return cursor.fetchall()[0]

    def getInfo(self):
        cursor.execute("SELECT * FROM player WHERE name = %s", (self.name,))
        return cursor.fetchall()[0]

    def getLocation(self):
        cursor.execute("SELECT country.name imageLink FROM player, country WHERE player.name = %s AND country.name = player.location", (self.name,))
        res = cursor.fetchall()[0]
        return res

    def setPlayer(self):
        argDict = self.vals
        argDict.update({"name2" : self.name})
        cursor.execute("UPDATE player SET name = %s, poleStrAmount = %s, poleCond  = %s, bait = %s, string = %s, luck = %s, location = %s WHERE name = %s", argDict)
        cnx.commit()

p = player("Markus")
print(p.vals["name"])
cursor.close()
cnx.close()
