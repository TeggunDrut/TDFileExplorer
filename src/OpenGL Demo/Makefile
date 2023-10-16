all: main

libs =  -lglfw3 -lopengl32 -lgdi32 -ld3d11 -ld3dcompiler -lgdi32 -ldwmapi 
bins = bin/imgui_demo.o bin/imgui_impl_opengl3.o bin/imgui.o bin/imgui_draw.o bin/imgui_tables.o bin/imgui_widgets.o bin/main.o bin/glad.o bin/imgui_impl_glfw.o


main: $(objects)
	g++ -c src/main.cpp -o bin/main.o -Iinclude
# g++ -c src/Menu/Menu.cpp -o bin/Menu.o 
# g++ -c src/Menu/Gui.cpp -o bin/Gui.o  -Iinclude

compileOther:
	g++ -c src/Engine/Console/Console.cpp -o bin/Console.o -Iinclude

# g++ -c src/Engine/Menu/Menu.cpp -o bin/Menu.o -Iinclude
# g++ -c src/Engine/Model/Model.cpp -o bin/Model.o -Iinclude
# g++ -c src/Engine/Group/Group.cpp -o bin/Group.o -Iinclude
# g++ -c src/Engine/Model/EBO.cpp -o bin/EBO.o -Iinclude
# g++ -c src/Engine/Model/VAO.cpp -o bin/VAO.o -Iinclude
# g++ -c src/Engine/Model/VBO.cpp -o bin/VBO.o -Iinclude
# g++ -c src/Engine/ShaderClass/ShaderClass.cpp -o bin/ShaderClass.o -Iinclude
# g++ -c src/Engine/stb.cpp -o bin/stb.o -Iinclude
# g++ -c src/Engine/Texture/Texture.cpp -o bin/Texture.o -Iinclude
# g++ -c src/Engine/Camera/Camera.cpp -o bin/Camera.o -Iinclude
# g++ -c src/Engine/Mesh/Mesh.cpp -o bin/Mesh.o -Iinclude
compileImGui:
	g++ -c include/imgui/imgui.cpp -o bin/imgui.o -Iinclude -Wall
	g++ -c include/imgui/imgui_draw.cpp -o bin/imgui_draw.o -Iinclude -Wall
	g++ -c include/imgui/imgui_tables.cpp -o bin/imgui_tables.o -Iinclude -Wall
	g++ -c include/imgui/imgui_widgets.cpp -o bin/imgui_widgets.o -Iinclude -Wall
	g++ -c include/imgui/backends/imgui_impl_opengl3.cpp -o bin/imgui_impl_opengl3.o -Iinclude -Wall
	g++ -c include/imgui/backends/imgui_impl_glfw.cpp -o bin/imgui_impl_glfw.o -Iinclude -Wall
	g++ -c include/imgui/imgui_demo.cpp -o bin/imgui_demo.o -Iinclude -Wall
compileExe:
	g++ bin/main.o bin/glad.o -o main.exe -Llib ${libs}
compileWithImGui:
	make main
	g++ bin/Console.o bin/Group.o bin/Menu.o bin/ImGuiFileDialog.o bin/Voxel.o bin/Model.o bin/Mesh.o bin/Camera.o bin/Texture.o bin/stb.o bin/ShaderClass.o bin/EBO.o bin/VAO.o bin/VBO.o bin/main.o bin/glad.o bin/imgui.o bin/imgui_demo.o bin/imgui_draw.o bin/imgui_widgets.o bin/imgui_tables.o bin/imgui_impl_opengl3.o bin/imgui_impl_glfw.o -Llib -lglfw3 -lopengl32 -lgdi32 -ld3d11 -ld3dcompiler -lgdi32 -ldwmapi -o main.exe 
	make run
run:
	./main.exe