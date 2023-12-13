def catchFish(playerName, fishName):
    money = random.randint(5, 15)
    player.cursor.execute("UPDATE caught, player SET caught = 1, money = %s WHERE player = %s AND fish = %s", (money, playerName, fishName))
    player.cnx.commit()