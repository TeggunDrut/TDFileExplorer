from pynput.keyboard import Key, Controller
import time
import random
keyboard = Controller()

words = input("words: ")

time.sleep(2)
for i in words:
  if i == "$":
    keyboard.press(Key.enter)
  else:
    # time.sleep(random.uniform(0.01, 0.21))
    time.sleep(random.uniform(0.010, 0.009))
    keyboard.press(i)