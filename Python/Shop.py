class shop:
    def __init__(self):
        global cursor, cnx
        self.stock = {"items": [], "itemCount": 0}
        cursor.execute("SELECT * FROM bait", {})
        baits = cursor.fetchall()
        for bait in baits:
            bait.update({"type": "bait"})
            self.stock["items"].append(bait)

        cursor.execute("SELECT * FROM string", {})
        strings = cursor.fetchall()
        for string in strings:
            string.update({"type": "string"})
            self.stock["items"].append(string)

        self.stock["itemCount"] = len(self.stock["items"])
        # with open("../JSON/shop.json", 'w') as shopjson:
        #    json.dump(self.stock, shopjson)
