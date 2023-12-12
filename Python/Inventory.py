# Inventory is stored in the database
#   it has all the objects that can be in the as a number of quantity
#   in this file are the functions to retrieve and set that information

def GetInv(player):
    player.cursor.execute("SELECT * FROM inventory WHERE player = %s", (player.name,))
    return player.cursor.fetchall()[0]

def MakeInv(player):
    player.cursor.execute("INSERT INTO inventory (player) VALUES (%s)", (player.name,))
    player.cnx.commit()
    return GetInv(player)

def SetInv(player, invDict):
    invDict.update({"name" : player.name})
    player.cursor.execute("UPDATE inventory SET player = %s, val1 = %s, val2 = %s, val3 = %s, val4 = %s, val5 = %s, val6 = %s WHERE player = %s", invDict)
    player.cnx.commit()
    return GetInv(player)
