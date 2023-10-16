#include "Console.h"

void Console::clear() {
    lines.clear();
}

void Console::ExecuteCommand(std::string command) {
    // if there are space sperate string into an array
    std::vector<std::string> args;
    std::istringstream ss(command);
    std::string token;
    while (std::getline(ss, token,' ')) {
        args.push_back(token);
    }
    // if the first string is "clear" clear the console
    if (args.size() > 0 && args[0] == "clear") {
        Console::clear();
        return;
    }
}

Console::Console() {

}
void Console::Log(std::string message) {
    lines.push_back(message);
}
void Console::Render() {
    ImGui::Begin("Console");
    // clear button
    if (ImGui::Button("Clear")) {
        Console::clear();
    }
    ImGui::InputText("Input", buf, 400);
    ImGui::SameLine();
    if (ImGui::Button("Send")) {
        line = std::string(buf);
        lines.push_back(line);
        Console::ExecuteCommand(line);
        std::cout << line << std::endl;
    }
    // draw all lines
    // draw lines starting from end
    for (int i = lines.size() - 1; i >= 0; i--) {
        ImGui::Text(lines[i].c_str());
    }
    ImGui::End();
}

