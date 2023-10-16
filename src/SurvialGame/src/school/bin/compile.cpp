#include <iostream>

#include <string>

int main() {
  std::string compilerPathWithExe = "G:\\mingw64\\bin\\g++.exe"; // full path e.g C:\\users\\john\\main.exe
  std::string homeDir = "G:\\,Working\\SurvialGame\\src\\"; // ends with double backslash

  std::string mainCppPath = "G:\\,Working\\SurvialGame\\src\\main.cpp"; // full path e.g C:\\users\\john\\main.cpp
  std::string objName = homeDir + "school\\bin\\main.o";
  std::string exeName = homeDir + "school\\bin\\main.exe";

  std::string includePath = "-I" + homeDir + "includes\\x64";
  std::string libPath = "-L" + homeDir + "Libraries\\x64";
  std::string libList = " -lsfml-graphics -lsfml-window -lsfml-system";

  std::string makeOBJ = compilerPathWithExe + " -c " + mainCppPath + " -o " + objName + " " + includePath + " ";
  std::string makeEXE = compilerPathWithExe + " " + objName + " -o " + exeName + " " + libPath + " " + includePath + libList;
  std::cout << "Starting OBJ " << makeOBJ << std::endl;
  system(makeOBJ.c_str());
  std::cout << "Finished OBJ" << std::endl;
  std::cout << "Starting EXE " << makeEXE << std::endl;
  system(makeEXE.c_str());
  std::cout << "Finished EXE" << std::endl;

  std::string run = "start " + exeName;

  system(run.c_str());

  return 0;
}