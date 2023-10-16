#include <SFML/Graphics.hpp>
#include <iostream>
#include "GameKeyboard.h"
#include "BulletObject.h"
#include <math.h>
#include <cmath>
#include <vector>
#ifndef PLAYER_H
class Player
{
public:
  float x;
  float y;
  float width;
  float height;

  sf::RectangleShape shape;
  sf::CircleShape eye;
  sf::Color fillColor;
  float moveSpeed = 250; // high since mulitplied by deltaTime
  sf::RectangleShape hand;

  int facing = 3;
  bool shotAvailable;

  float timer = 0;
  bool shot = false; // i shot a bullet

  int kills = 0;

  int firePower = 500;

  float damage = 20;

  Player(float a, float b, float c, float d, sf::Color e)
  {
    x = a;
    y = b;
    width = c;
    height = d;
    fillColor = e;
    shotAvailable = true;
    // create object
    sf::RectangleShape s(sf::Vector2f(width, height));
    s.setPosition(x, y);
    s.setFillColor(fillColor);
    shape = s;
    eye.setScale(4, 4);

    sf::RectangleShape h(sf::Vector2f(width / 2, height / 2));
    h.setFillColor(fillColor);
    hand = h;
  }
  bool coolDown(float timeInSeconds)
  {

    if (timer >= timeInSeconds * 100)
    {
      return true;
    }

    return false;
  }
  void shoot(int num, std::vector<BulletObject> &bullets)
  {
    if (coolDown(.2))
    {
      shotAvailable = true;
    }
    switch (num)
    {
    case 0:
      // up
      if (shotAvailable)
      {
        BulletObject newBullet(x + width / 4 + 2.5, y - height + 2.5, 10, sf::Color::Red, true, damage);
        newBullet.yVel = -newBullet.speed;
        bullets.push_back(newBullet);
        shotAvailable = false;

        timer = 0;
      }
      break;
    case 1:
      // up
      if (shotAvailable)
      {
        BulletObject newBullet(x + width + width / 2, y + height / 4 + 2.5, 10, sf::Color::Red, true, damage);
        newBullet.xVel = newBullet.speed;
        bullets.push_back(newBullet);
        shotAvailable = false;

        timer = 0;
      }
      break;
    case 2:
      // up
      if (shotAvailable)
      {
        BulletObject newBullet(x + width / 4 + 2.5, y + height + height / 2, 10, sf::Color::Red, true, damage);
        newBullet.yVel = newBullet.speed;
        bullets.push_back(newBullet);
        shotAvailable = false;

        timer = 0;
      }
      break;
    case 3:
      // up
      if (shotAvailable)
      {

        BulletObject newBullet(x - width + 5, y + height / 4 + 2.5, 10, sf::Color::Red, true, damage);
        newBullet.xVel = -newBullet.speed;
        bullets.push_back(newBullet);
        shotAvailable = false;

        timer = 0;
      }
      break;
    }
  }

  bool isKeyPressed(sf::Keyboard::Key key)
  {
    if (sf::Keyboard::isKeyPressed(key))
      return true;
    else
      return false;
  }
  void move(float newX, float newY)
  {
    shape.setPosition(shape.getPosition().x + newX, shape.getPosition().y + newY);
  }
  void draw(sf::RenderWindow &window)
  {
    eye.setPosition(shape.getPosition().x + width, shape.getPosition().y + height / 2);
    switch (facing)
    {
    case 0:
      // up
      hand.setPosition(shape.getPosition().x + width / 2 - width / 4, shape.getPosition().y - height / 2);
      break;
    case 1:
      // right
      hand.setPosition(shape.getPosition().x + width, shape.getPosition().y + height / 4);
      break;
    case 2:
      // down
      hand.setPosition(shape.getPosition().x + width / 2 - width / 4, shape.getPosition().y + height);
      break;
    case 3:
      // left
      hand.setPosition(shape.getPosition().x - width / 2, shape.getPosition().y + height / 4);
      break;
    }
    window.draw(shape);
    window.draw(eye);
    window.draw(hand);
  }
  void lookAt(sf::Vector2f point)
  {
    float currentRotation = shape.getRotation();
    float zeroedRotation = shape.getRotation() + -shape.getRotation();
    float dist1 = sqrt(pow(point.y - shape.getPosition().y, 2) + pow(point.x - shape.getPosition().x, 2));
    float dist2 = point.x - shape.getPosition().x;

    float rotation = acos(dist2 / dist1) * (180 / M_PI);
    // currently not working
  }
  void switchHand(int num)
  {
    switch (num)
    {
    case 0:
      facing = 0;
      break;
    case 1:
      facing = 1;
      break;
    case 2:
      facing = 2;
      break;
    case 3:
      facing = 3;
      break;
    }
  }
  void update(sf::RenderWindow &window, float deltaTime, GameKeyboard &gk, std::vector<BulletObject> &bullets)
  {
    x = shape.getPosition().x;
    y = shape.getPosition().y;

    for (BulletObject &b : bullets)
    {
      // if (b.x > x && b.x + b.radius * 2 < x + radius * 2
      // &&  b.y > y && b.y + b.radius * 2 < y + radius * 2
      if (b.x < x + width &&
          b.x + b.radius > x &&
          b.y < y + height * 2 &&
          b.radius * 2 + b.y > y && b.sentByPlayer == false)
      {
        for (std::vector<BulletObject>::iterator it = bullets.begin(); it != bullets.end(); ++it)
        { // Error 2-4
          if (it->shape.getLocalBounds() == b.shape.getLocalBounds())
          {
            bullets.erase(it);
            break;
          }
        }
      }
    }

    if (isKeyPressed(sf::Keyboard::Up))
    {
      shoot(0, bullets);
      switchHand(0);
    }
    else if (isKeyPressed(sf::Keyboard::Right))
    {
      shoot(1, bullets);
      switchHand(1);
    }
    else if (isKeyPressed(sf::Keyboard::Down))
    {
      shoot(2, bullets);
      switchHand(2);
    }
    else if (isKeyPressed(sf::Keyboard::Left))
    {
      shoot(3, bullets);
      switchHand(3);
    }
    if (gk.A)
    {
      move(-moveSpeed * deltaTime, 0);
    }
    else if (gk.D)
    {
      move(moveSpeed * deltaTime, 0);
    }
    if (gk.W)
    {
      move(0, -moveSpeed * deltaTime);
    }
    else if (gk.S)
    {
      move(0, moveSpeed * deltaTime);
    }
    // lookAt(sf::Vector2f(100, 100));

    timer += 1;
    // std::cout << "timer: " << timer << std::endl;
  }
};
#endif // DEBUG
