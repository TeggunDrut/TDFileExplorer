#ifndef CONSOLE_H
#define CONSOLE_H

#include <vector>
#include <string>
#include <iostream>
#include <sstream>
#include <imgui/imgui.h>

class Console {
    public:
        Console();

        char buf[400];
        std::string line; 
        std::vector<std::string> lines;
        void ExecuteCommand(std::string command);
        void Render();
        void Log(std::string messagee);
        void clear();
};

#endif