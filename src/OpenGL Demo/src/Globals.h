#include <iostream>
#include <glad/glad.h>
#include <GLFW/glfw3.h>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/ext.hpp>
#include <imgui/imgui.h>
#include <imgui/backends/imgui_impl_glfw.h>
#include <imgui/backends/imgui_impl_opengl3.h>

#include <iostream>
#include <string>
#include <filesystem>
#include <unistd.h>

#include "Engine/Mesh/Mesh.h" // lol
#include "Engine/Voxel/Voxel.h"
#include "Engine/Model/Model.h"
#include "Engine/Group/Group.h"
#include "Engine/ImGui/ImGuiFileDialog.h"

#include "Engine/Menu/Menu.h"
#include "Engine/Console/Console.h"