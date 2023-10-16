#include <vector>
#ifndef ENEMY_H

class Entity
{
public:
  float x, y;
  sf::CircleShape shape;
  float radius;

  float xVel;
  float yVel;
  float timer = 0;
  sf::Color fillColor;
  int facing = 3;
  sf::RectangleShape cannon;
  float cannonMult = 1;

  float moveSpeed = 100;
  bool shotAvailable = true;
  float health;
  float damage;
  Entity(float a, float b, float c, sf::Color d, float e, float f)
  {
    x = a;
    y = b;
    radius = c;
    fillColor = d;
    health = e;
    damage = f;
    sf::CircleShape s(radius);
    s.setPosition(x, y);
    s.setFillColor(fillColor);
    shape = s;

    sf::RectangleShape ca(sf::Vector2f(radius / cannonMult, radius / cannonMult));
    ca.setFillColor(fillColor);
    cannon = ca;
  }
  void move(float newX, float newY)
  {
    shape.setPosition(x + newX, y + newY);
  }
  void draw(sf::RenderWindow &window)
  {
    float cannonSize = radius / cannonMult;

    switch (facing)
    {
    case 0:
      // up
      cannon.setPosition(shape.getPosition().x + radius - cannonSize / 2, shape.getPosition().y - radius + 2);
      break;
    case 1:
      // right
      cannon.setPosition(shape.getPosition().x + radius * 2 - 2, shape.getPosition().y + radius - cannonSize / 2);
      break;
    case 2:
      // down
      cannon.setPosition(shape.getPosition().x + radius - cannonSize / 2, shape.getPosition().y + radius * 2 - 2);
      break;
    case 3:
      // left
      cannon.setPosition(shape.getPosition().x - radius + 2, shape.getPosition().y + radius - cannonSize / 2);
      break;
    }
    window.draw(cannon);
    window.draw(shape);
  }
  void shoot(int num, std::vector<BulletObject> &bullets)
  {
    if (coolDown(.5))
    {
      shotAvailable = true;
    }
    switch (num)
    {
    case 0:
      // up
      if (shotAvailable)
      {
        BulletObject newBullet(x + (radius * 2) / 4, y - (radius * 2), 10, sf::Color::Red, false, damage);
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
        BulletObject newBullet(x + (radius * 2) + (radius * 2) / 2, y + (radius * 2) / 4, 10, sf::Color::Red, false, damage);
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
        BulletObject newBullet(x + (radius * 2) / 4, y + (radius * 2) + (radius * 2) / 2, 10, sf::Color::Red, false, damage);
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

        BulletObject newBullet(x - (radius * 2) + 5, y + (radius * 2) / 4, 10, sf::Color::Red, false, damage);
        newBullet.xVel = -newBullet.speed;
        bullets.push_back(newBullet);
        shotAvailable = false;

        timer = 0;
      }
      break;
    }
  }

  void update(float delta, Player &player, std::vector<BulletObject> &bullets)
  {
    x = shape.getPosition().x;
    y = shape.getPosition().y;
    bool temp = false;
    for (BulletObject &b : bullets)
    {
      // if (b.x > x && b.x + b.radius * 2 < x + radius * 2
      // &&  b.y > y && b.y + b.radius * 2 < y + radius * 2
      if (b.x < x + radius * 2 &&
          b.x + b.radius * 2 > x &&
          b.y < y + radius * 2 &&
          b.radius * 2 + b.y > y && b.sentByPlayer)
      {
        for (std::vector<BulletObject>::iterator it = bullets.begin(); it != bullets.end(); ++it)
        { // Error 2-4
          if (it->shape.getLocalBounds() == b.shape.getLocalBounds() && temp == false)
          {
            bullets.erase(it);
            temp = true;
            break;
          }
        }
      }
    }

    if (x < player.x + player.width / 2 - radius - 1)
    {
      move(moveSpeed * delta, 0);
      facing = 1;
    }
    if (x > player.x + player.width / 2 - radius + 1)
    {
      move(-moveSpeed * delta, 0);
      facing = 3;
    }
    if (y < player.y + player.height / 2 - radius - 1)
    {
      move(0, moveSpeed * delta);
      facing = 2;
    }
    if (y > player.y + player.height / 2 - radius + 1)
    {
      move(0, -moveSpeed * delta);
      facing = 0;
    }

    if (x < player.x && facing == 1)
      shoot(1, bullets);
    if (x > player.x && facing == 3)
      shoot(3, bullets);
    if (y < player.y && facing == 2)
      shoot(2, bullets);
    if (y > player.y && facing == 0)
      shoot(0, bullets);

    timer += 1;
  }
  bool coolDown(float timeInSeconds)
  {

    if (timer >= timeInSeconds * 100)
    {
      return true;
    }

    return false;
  }
};
#endif