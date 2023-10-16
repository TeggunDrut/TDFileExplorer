#include <SFML/Graphics.hpp>
#include <iostream>
#include "Globals.h"

int WINDOW_WIDTH = 1026;
int WINDOW_HEIGHT = 720;

int mouseX = 0;
int mouseY = 0;

GameKeyboard keyboard;

std::vector<sf::CircleShape> points;

// Player player(100.0, 100.0, 50.0, 50.0, sf::Color(20, 20, 40));

// std::vector<BulletObject> bullets;
// std::vector<Entity> enemies;

// sf::RectangleShape levelBarBackground(sf::Vector2f(WINDOW_WIDTH, 40));
// sf::RectangleShape levelBarForeground(sf::Vector2f(WINDOW_WIDTH, 40));
// sf::Text playerLevel;
// sf::Text kills;

// Entity entity(100, 100, 20, sf::Color(100, 20, 50), 100, 10);

void Update(sf::RenderWindow &window, sf::Time deltaTime)
{
    double delta = deltaTime.asSeconds();
    // player.draw(window);
    // player.update(window, delta, keyboard, bullets);

    for (sf::CircleShape &point : points)
    {
        window.draw(point);
    }

    // for (Entity &e : enemies)
    // {
    //     e.draw(window);
    //     e.update(delta, player, bullets);
    // }
    // for (BulletObject &i : bullets)
    // {
    //     i.draw(window);
    //     i.update(delta, bullets);
    // }
}
bool isKeyPressed(sf::Keyboard::Key key)
{
    if (sf::Keyboard::isKeyPressed(key))
        return true;
    else
        return false;
}
int main()
{
    sf::Font font;
    // enemies.push_back(entity);
    if (!font.loadFromFile("./assets/ARIAL.TTF"))
    {
        std::cout << "Couldnt load ARIAL.TTF" << std::endl;
    }
    else
    {
        std::cout << "Loaded ARIAL.TTF" << std::endl;
    }
    

    // playerLevel.setFont(font);
    // kills.setFont(font);
    // playerLevel.setPosition(8, 8);
    // playerLevel.setCharacterSize(20);

    // kills.setPosition(8, 32);
    // kills.setCharacterSize(20);

    sf::RenderWindow window(sf::VideoMode(WINDOW_WIDTH, WINDOW_HEIGHT), "Window Title!");
    sf::Clock deltaTime;
    // window.setMouseCursorGrabbed(true);
    window.setFramerateLimit(60);
    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
                window.close();
            if (isKeyPressed(sf::Keyboard::Escape))
                window.close();

            if (isKeyPressed(sf::Keyboard::W))
                keyboard.W = true;
            else
                keyboard.W = false;
            if (isKeyPressed(sf::Keyboard::S))
                keyboard.S = true;
            else
                keyboard.S = false;
            if (isKeyPressed(sf::Keyboard::A))
                keyboard.A = true;
            else
                keyboard.A = false;
            if (isKeyPressed(sf::Keyboard::D))
                keyboard.D = true;
            else
                keyboard.D = false;

            if (isKeyPressed(sf::Keyboard::Space))
                keyboard.Space = true;
            else
                keyboard.Space = false;
            // Mouse LEFT Down MOUSELEFT MOUSE-LEFT MOUSE LEFT
            // set mouseX and mouseY
            // mouseX = sf::Mouse::getPosition(window).x;
            // mouseY = sf::Mouse::getPosition(window).y;
        }

        window.clear();
        sf::RectangleShape bg(sf::Vector2f(WINDOW_WIDTH, WINDOW_HEIGHT));
        bg.setFillColor(sf::Color(10, 10, 20));
        window.draw(bg);

        // playerLevel.setString("Power: " + std::to_string(player.firePower / 100));
        // kills.setString("Kills: " + std::to_string(player.kills));

        // window.draw(playerLevel);
        // window.draw(kills);

        Update(window, deltaTime.restart());
        window.display();
    }

    return 0;
}