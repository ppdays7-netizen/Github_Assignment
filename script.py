inventory = {
    "Rifle": 120,
    "Helmet": 150,
    "Bulletproof Vest": 100,
    "Radio": 40
}

print("=== Army Inventory ===")
for item, qty in inventory.items():
    print(f"{item}: {qty}")

# Add new stock
item = input("\nEnter item to update: ")
quantity = int(input("Enter quantity to add: "))

inventory[item] = inventory.get(item, 0) + quantity

print("\nUpdated Inventory:")
for item, qty in inventory.items():
    print(f"{item}: {qty}")


soldiers = [
    {"Name": "Piyush", "Rank": "Brigadier", "Unit": "Infantry"},
    {"Name": "Gaurang", "Rank": "Major", "Unit": "Artillery"},
    {"Name": "Durvankur", "Rank": "Lieutenant", "Unit": "Engineers"}
]

print("=== Soldier Records ===")
for s in soldiers:
    print(f"{s['Name']} | {s['Rank']} | {s['Unit']}")
