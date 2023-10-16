import pyautogui as pg
import random

# get mouse coords
# if it has been in the same position for 100 times, exit
# push coord to list and check if it is in the list


# topLeft = positions[0]
# topRight = positions[1]
# bottomLeft = positions[2]
# bottomRight = positions[3]

# tileWidth = (topRight[0] - topLeft[0]) / 5
# tileHeight = (bottomLeft[1] - topLeft[1]) / 5

startPos = [2424, 818]

tileWidth = 43
tileHeight = 43

positions = []

for i in range(5):
    for j in range(5):
        positions.append(
            [
                (startPos[0] + tileWidth * i) + tileWidth / 2,
                (startPos[1] + tileHeight * j) + tileHeight / 2,
            ]
        )

print(positions)

# randomly pick a position and click
import random
import pyautogui as pg

# Assuming you have a list of available positions named 'positions'
# Example: positions = [(x1, y1), (x2, y2), ...]

num_positions = len(positions)
positions_indices = list(range(num_positions))

import random
import pyautogui as pg

# Assuming you have a list of available positions named 'positions'
# Example: positions = [(x1, y1), (x2, y2), ...]

num_positions = len(positions)
positions_indices = list(range(num_positions))

# for i in range(25):
#     if not positions_indices:
#         positions_indices = list(range(num_positions))
#     index = random.choice(positions_indices)
#     positions_indices.remove(index)
#     pos = positions[index]
#     pg.moveTo(pos[0] + random.randint(-4, 4), pos[1] + random.randint(-2, 2))
#     pg.mouseDown()
#     pg.sleep(random.random() / 100)
#     pg.mouseUp()
#     pg.sleep(random.random() / 100)


# for position in positions:
#     pg.click(position[0] + random.randint(-4, 4), position[1] + random.randint(-2, 2))
#     pg.sleep(random.randint(1, 3) / 10)

while True:
  x, y = pg.position()
  print(x, y)
  pg.sleep(0.01)

# topLeft     : 2416 785
# topRight    : 2642 785
# bottomLeft  : 2416 1039
# bottomRight : 2642 1039
# ---
# 2425 815
# 2632 815
# 2425 1025
# 2632 1025

# 2424 818 -right- 2466 818
# 2424 818 -down - 2424 860