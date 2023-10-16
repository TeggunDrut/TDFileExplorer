#include "Menu.h"

void Menu::Render() { 
	ImGui::Begin("General");
	
	ImGui::End();
}
void Menu::Theme() {
	ImGuiStyle *style = &ImGui::GetStyle();

	style->WindowTitleAlign = ImVec2(0.5f, 0.5f);
	
	style->FramePadding = ImVec2(4, 2);

	style->Colors[ImGuiCol_TitleBg] = ImColor(7, 115, 192, 255);	
	style->Colors[ImGuiCol_TitleBgActive] = ImColor(7, 115, 192, 255);	
	style->Colors[ImGuiCol_TitleBgCollapsed] = ImColor(7, 115, 192, 255);	

	style->Colors[ImGuiCol_Button] = ImColor(7, 115, 192, 255);
	style->Colors[ImGuiCol_ButtonHovered] = ImColor(235, 81, 33, 255);
	style->Colors[ImGuiCol_ButtonActive] = ImColor(235, 81, 33, 255);
	
	// window rounding set to 4
	style->WindowRounding = 4.0f;
	style->FrameRounding = 4.0f;
	style->GrabRounding = 1.0f;
	style->ScrollbarRounding = 4.0f;

	// window menyu position set to non
	style->WindowMenuButtonPosition = ImGuiDir_None;
	// set font
}