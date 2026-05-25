import csv
import random

rows = []

for i in range(500):
    age = random.randint(20, 85)
    bp = random.randint(100, 220)
    sugar = random.randint(70, 300)

    risk = 0

    if age > 55:
        risk += 1
    if bp > 145:
        risk += 1
    if sugar > 150:
        risk += 1

    if risk >= 2:
        final_risk = 1
    else:
        final_risk = 0

    rows.append([age, bp, sugar, final_risk])

with open("dataset.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["age", "bp", "sugar", "risk"])
    writer.writerows(rows)

print("500 Row Dataset Created Successfully")