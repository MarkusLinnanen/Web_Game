# This whole class was a developmental oversight and makes code more complex than it needs to be
# When the getPlayer Function is being used it is being used so we can get a player class object by name only

import Inventory

class player:
    def __init__(self, cursor, con, name):
        self.name = name
        self.cursor = cursor
        self.cnx = con
        if not name:
            return
        # make the player row in the database
        self.cursor.execute("SELECT * FROM player WHERE name = %s", (self.name,))
        if not self.cursor.fetchall():
            self.cursor.execute("INSERT INTO player (name) VALUES (%s)", (self.name,))
            self.cursor.execute("SELECT * FROM fish")
            for fish in cursor.fetchall():
                self.cursor.execute("INSERT INTO caught (fish, player) VALUES (%s, %s)", (fish["name"], self.name))

            self.cnx.commit()
            Inventory.MakeInv(self)

        self.cursor.execute("SELECT * FROM player WHERE name = %s", (self.name, ))
        self.vals = cursor.fetchall()[0]

    def getPole(self):
        self.cursor.execute("SELECT poleName, poleStrAmount, poleCond FROM player WHERE name = %s", (self.name,))
        return self.cursor.fetchall()[0]

    def getString(self):
        self.cursor.execute("SELECT line.name, breakPercent FROM player, line WHERE player.name = %s AND line.name = player.line", (self.name,))
        return self.cursor.fetchall()[0]

    def getPlayer(self):
        self.cursor.execute("SELECT * FROM player WHERE name = %s", (self.name,))
        return self.cursor.fetchall()[0]

    def getLocation(self):
        self.cursor.execute("SELECT country.name, imageLink FROM player, country WHERE player.name = %s AND country.name = player.location", (self.name,))
        return self.cursor.fetchall()[0]

    def setPlayer(self, arg):
        argDict = dict(arg)
        argDict.update({"name2" : self.name})
        self.cursor.execute("UPDATE player SET name = %s, poleStrAmount = %s, poleCond  = %s, bait = %s, string = %s, luck = %s, location = %s WHERE name = %s", argDict)
        self.cnx.commit()

    def getMoney(self):
        self.cursor.execute("SELECT money FROM player WHERE name = %s", (self.name,))
        return self.cursor.fetchall()[0]

    def setMoney(self, money):
        self.cursor.execute("UPDATE player SET money = money + %s WHERE name = %s", (money, self.name))
        self.cnx.commit()
        return self.getMoney()

    def deletePlayer(self):
        self.cursor.execute("DELETE FROM caught WHERE player = %s", (self.name,))
        self.cursor.execute("DELETE FROM inventory WHERE player = %s", (self.name,))
        self.cursor.execute("DELETE FROM player WHERE name = %s", (self.name,))
        self.cnx.commit()
        return {"deletion" : "success"}


