#include "SFML/Graphics.hpp"
#ifndef BULLET_OBJECT_H
#define BULLET_OBJECT_H
class BulletObject
{
public:
  float x;
  float y;
  sf::CircleShape shape;
  sf::Color fillColor;
  int radius;
  float xVel;
  float yVel;
  float rotation;
  float speed = 500;
  bool sentByPlayer = false;
  float damage;
  float aliveTimer = 0;
  BulletObject(float a, float b, float c, sf::Color d, bool e, float f)
  {
    x = a;
    y = b;
    radius = c;
    fillColor = d;
    sentByPlayer = e;
    damage = f;
    sf::CircleShape ss(radius);
    ss.setFillColor(fillColor);
    ss.setPosition(x, y);
    shape = ss;
  }
  void move(float newX, float newY)
  {
    shape.setPosition(shape.getPosition().x + newX, shape.getPosition().y + newY);
  }
  void draw(sf::RenderWindow &window)
  {
    window.draw(shape);
  }
  void update(float deltaTime, std::vector<BulletObject> &bullets)
  {

    if (aliveTimer > 200)
    {
      for (std::vector<BulletObject>::iterator bullet = bullets.begin(); bullet != bullets.end(); ++bullet)
      { // Error 2-4
        if (bullet->x == x)
        {
          bullets.erase(bullet);
          break;
        }
      }
    }

    // shape.setRotation(rotation);
    x = shape.getPosition().x;
    y = shape.getPosition().y;
    shape.setPosition(shape.getPosition().x + xVel * deltaTime, shape.getPosition().y + yVel * deltaTime);
    // std::cout << "x: " << x << std::endl;
    // move(shape.getPosition().x + (xVel*deltaTime), shape.getPosition().y + (yVel*deltaTime));
    // shape.setPosition(shape.getPosition().x + xVel*deltaTime, shape.getPosition().y + yVel*deltaTime);
    // move(100, 100);
    aliveTimer += 1;
  }
};

#endif
