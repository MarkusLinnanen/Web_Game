import json
import mysql
import mysql.connector

cnx = mysql.connector.connect(user='userguy', password='pw0rd',
                              host='localhost',
                              database='fishbase')
cursor = cnx.cursor(dictionary = True)
# Structure of the player json file
# {
# "name" : "Name of player",
# "Fishing Pole" : {"name" : "name of fishing pole",
#                   "condition" : poleCondition (as float(decimal) 0.0 - 1.0)
#                   "stringAmount" : amount of string left}
# "Bait" : "Name of bait",
# "String" : {"name" : "name of string being used",
#             "breakPercent" : likelihood breaking out of 100 so 5% = 5},
# "Luck" : as "Hellish", "Bad", "Neutral", "Good", "Heavenly" (Not complete idea but may add some interest to the game)
#
# Leaving room for potential additions
#
#
#}

class player:
    def __init__(self, name):
        self.name = name
        # make the player row in the database
        cursor.execute("INSERT INTO player (name) VALUES (%s)", {self.name,})
        cnx.commit()
        cursor.execute("SELECT * FROM player WHERE name = %s", {self.name, })
        self.vals = cursor.fetchall()[0]

    def getPole(self):
        cursor.execute("SELECT poleName, poleStrAmount, poleCond FROM player WHERE name = %s", {self.name,})
        res = cursor.fetchall()[0]
        return res

    def getString(self):
        cursor.execute("SELECT string.name breakPercent FROM player, string WHERE player.name = %s AND string.name = player.string", {self.name,})
        res = cursor.fetchall()[0]
        return res

    def getInfo(self):
        cursor.execute("SELECT * FROM player WHERE name = %s", {self.name,})
        return cursor.fetchall()[0]

    def getLocation(self):
        cursor.execute("SELECT country.name imageLink FROM player, country WHERE player.name = %s AND country.name = player.location", {self.name,})
        res = cursor.fetchall()[0]
        return res

    def setPlayer(self, playerData):
        cursor.execute("UPDATE player SET name = %s, poleStrAmount = %s, poleCond  = %s, bait = %s, string = %s, luck = %s, location = %s WHERE name = %s", {self.name})
        cnx.commit()
