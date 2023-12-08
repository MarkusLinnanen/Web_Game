class player:
    def __init__(self, cursor, con, name = ""):
        self.name = name
        self.cursor = cursor
        self.cnx = con
        if not name:
            return
        # make the player row in the database
        self.cursor.execute("SELECT * FROM player WHERE name = %s", (self.name,))
        if not self.cursor.fetchall():
            self.cursor.execute("INSERT INTO player (name) VALUES (%s)", (self.name,))
            self.cursor.execute("SELECT ID FROM fish")
            for num in cursor:
                self.cursor.execute("INSERT INTO caught (fish, player) VALUES (%s, %s)", (num["ID"], self.name))
            self.cnx.commit()

        self.cursor.execute("SELECT * FROM player WHERE name = %s", (self.name, ))
        self.vals = cursor.fetchall()[0]

    def getPole(self):
        self.cursor.execute("SELECT poleName, poleStrAmount, poleCond FROM player WHERE name = %s", (self.name,))
        return self.cursor.fetchall()[0]

    def getString(self):
        self.cursor.execute("SELECT string.name breakPercent FROM player, string WHERE player.name = %s AND string.name = player.string", (self.name,))
        return self.cursor.fetchall()[0]

    def getPlayer(self):
        self.cursor.execute("SELECT * FROM player WHERE name = %s", (self.name,))
        return self.cursor.fetchall()[0]

    def getLocation(self):
        self.cursor.execute("SELECT country.name imageLink FROM player, country WHERE player.name = %s AND country.name = player.location", (self.name,))
        return self.cursor.fetchall()[0]

    def setPlayer(self, arg):
        argDict = dict(arg)
        argDict.update({"name2" : self.name})
        self.cursor.execute("UPDATE player SET name = %s, poleStrAmount = %s, poleCond  = %s, bait = %s, string = %s, luck = %s, location = %s WHERE name = %s", argDict)
        self.cnx.commit()

    def getMoney(self):
        self.cursor.execute("SELECT money FROM player WHERE name = %s", (self.name,))
        return self.cursor.fetchall()[0]
