#include "Globals.h"

float width = 1024;
float height = 768;

bool setCursor = false;
float rotationSpeed = 0.0f;
float colors[4] = {1.0f, 1.0f, 1.0f, 1.0f};
float a = 0.0f;
float b = 0.3f;
float modelPos[3] = {0.0f, 0.0f, 0.0f};
float lightIntensity = 3.5f;

glm::vec4 lightColor = glm::vec4(1.0f, 1.0f, 1.0f, 1.0f);
glm::vec3 lightPos = glm::vec3(-5, -55, -5);
glm::mat4 lightModel = glm::mat4(1.0f);

Console console;

Menu menu;

std::vector<Group> groups;
std::vector<Model> models;

// Menu menu;

Vertex lightVertices[] =
    { //     COORDINATES     //
        Vertex{glm::vec3(-0.1f, -0.1f, 0.1f)},
        Vertex{glm::vec3(-0.1f, -0.1f, -0.1f)},
        Vertex{glm::vec3(0.1f, -0.1f, -0.1f)},
        Vertex{glm::vec3(0.1f, -0.1f, 0.1f)},
        Vertex{glm::vec3(-0.1f, 0.1f, 0.1f)},
        Vertex{glm::vec3(-0.1f, 0.1f, -0.1f)},
        Vertex{glm::vec3(0.1f, 0.1f, -0.1f)},
        Vertex{glm::vec3(0.1f, 0.1f, 0.1f)}};

GLuint lightIndices[] =
    {
        0, 1, 2,
        0, 2, 3,
        0, 4, 7,
        0, 7, 3,
        3, 7, 6,
        3, 6, 2,
        2, 6, 5,
        2, 5, 1,
        1, 5, 4,
        1, 4, 0,
        4, 5, 6,
        4, 6, 7};

void MainGUIWindow(Camera &camera, Model &model);

int main()
{
    Group scene("Scene");
    groups.push_back(scene);

    glfwInit();

#if defined(IMGUI_IMPL_OPENGL_ES2)
    // GL ES 2.0 + GLSL 100
    const char *glsl_version = "#version 100";
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 2);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);
    glfwWindowHint(GLFW_CLIENT_API, GLFW_OPENGL_ES_API);
#elif defined(__APPLE__)
    // GL 3.2 + GLSL 150
    const char *glsl_version = "#version 150";
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 2);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE); // 3.2+ only
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);           // Required on Mac
#else
    // GL 3.0 + GLSL 130
    const char *glsl_version = "#version 130";
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);
// glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);  // 3.2+ only
// glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);            // 3.0+ only
#endif

    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

    GLFWwindow *window = glfwCreateWindow(width, height, "Goofy ah program", NULL, NULL);

    if (window == NULL)
    {
        std::cout << "Failed to create GLFW window" << std::endl;
        glfwTerminate();
        return -1;
    }

    glfwMakeContextCurrent(window);

    IMGUI_CHECKVERSION();
    ImGui::CreateContext();
    ImGuiIO &io = ImGui::GetIO();
    (void)io;

    ImGui::StyleColorsLight();

    ImGui_ImplGlfw_InitForOpenGL(window, true);
    ImGui_ImplOpenGL3_Init(glsl_version);

    ImGui::StyleColorsDark();

    gladLoadGL();
    glViewport(0, 0, width, height);
    Shader shaderProgram("src/Engine/shaders/default.vert", "src/Engine/shaders/default.frag");
    Shader lightShader("src/Engine/shaders/light.vert", "src/Engine/shaders/light.frag");

    std::vector<Vertex> lightVerts(lightVertices, lightVertices + sizeof(lightVertices) / sizeof(Vertex));
    std::vector<GLuint> lightInd(lightIndices, lightIndices + sizeof(lightIndices) / sizeof(GLuint));
    lightModel = glm::translate(lightModel, lightPos);

    glm::vec3 pyramidPos = glm::vec3(0.0f, 0.0f, 0.0f);
    glm::mat4 pyramidModel = glm::mat4(1.0f);
    pyramidModel = glm::translate(pyramidModel, pyramidPos);

    lightShader.Activate();
    glUniformMatrix4fv(glGetUniformLocation(lightShader.ID, "model"), 1, GL_FALSE, glm::value_ptr(lightModel));
    glUniform4f(glGetUniformLocation(lightShader.ID, "lightColor"), lightColor.x, lightColor.y, lightColor.z, lightColor.w);
    shaderProgram.Activate();
    glUniformMatrix4fv(glGetUniformLocation(shaderProgram.ID, "model"), 1, GL_FALSE, glm::value_ptr(pyramidModel));
    glUniform4f(glGetUniformLocation(shaderProgram.ID, "lightColor"), lightColor.x, lightColor.y, lightColor.z, lightColor.w);
    glUniform3f(glGetUniformLocation(shaderProgram.ID, "lightPos"), lightPos.x, lightPos.y, lightPos.z);

    GLuint VertexArrayID;
    glGenVertexArrays(1, &VertexArrayID);
    glBindVertexArray(VertexArrayID);
    Camera camera(width, height, glm::vec3(0.0f, 0.0f, 2.0f));

    glEnable(GL_DEPTH_TEST);
    glEnable(GL_CULL_FACE);
    glCullFace(GL_BACK);
    glFrontFace(GL_CCW);

    Shader shader1("src/Engine/shaders/default.vert", "src/Engine/shaders/default.frag");
    Model light(lightPos.x, lightPos.y, lightPos.z, "textures/models/sphere/sphere.gltf");

    Model model(0, 0, 0, "textures/models/Example/example.gltf");
    io.Fonts->AddFontFromFileTTF("src/Engine/Fonts/ARIAL.TTF", 16.0f);

    Model ground(0, 40, 0, "textures/models/Example/example.gltf");
    ground.id = 0;
    ground.scaleX = 2;
    ground.scaleY = .25;
    ground.scaleZ = 2;
    ground.rotX = 0;
    ground.rotY = 0;
    ground.rotZ = 0;

    groups[0].models.push_back(ground);

    while (!glfwWindowShouldClose(window))
    {
        lightColor = glm::vec4(colors[0], colors[1], colors[2], colors[3]);

        ImGui_ImplOpenGL3_NewFrame();
        ImGui_ImplGlfw_NewFrame();
        ImGui::NewFrame();

        menu.Theme();
        // menu.Render();
        console.Render();

        MainGUIWindow(camera, model);

        ImGui::Render();
        ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());

        glfwPollEvents();

        glClearColor(0.07f, 0.03f, 0.07f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        glUniformMatrix4fv(glGetUniformLocation(lightShader.ID, "model"), 1, GL_FALSE, glm::value_ptr(lightModel));
        glUniform4f(glGetUniformLocation(lightShader.ID, "lightColor"), lightColor.x, lightColor.y, lightColor.z, lightColor.w);
        shaderProgram.Activate();
        glUniform4f(glGetUniformLocation(shaderProgram.ID, "lightColor"), lightColor.x, lightColor.y, lightColor.z, lightColor.w);
        glUniform3f(glGetUniformLocation(shaderProgram.ID, "lightPos"), lightPos.x, lightPos.y, lightPos.z);

        glUniform3f(glGetUniformLocation(shaderProgram.ID, "camPos"), camera.Position.x, camera.Position.y, camera.Position.z);

        glUniform1f(glGetUniformLocation(shaderProgram.ID, "paramA"), a);
        glUniform1f(glGetUniformLocation(shaderProgram.ID, "paramB"), b);
        glUniform1f(glGetUniformLocation(shaderProgram.ID, "lightIntensity"), lightIntensity);

        camera.Inputs(window);
        camera.updateMatrix(45.0f, 0.1f, 100.0f);
        camera.Matrix(shaderProgram, "camMatrix");
        camera.shouldSetCursor = setCursor;

        for (Group &g : groups)
            g.Draw(shaderProgram, camera);

        ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());
        glfwSwapBuffers(window);
    }
    ImGui_ImplOpenGL3_Shutdown();
    ImGui_ImplGlfw_Shutdown();
    ImGui::DestroyContext();
    shaderProgram.Delete();
    glfwDestroyWindow(window);
    glfwTerminate();
    return 0;
}

char buf[200];
std::string name = "";

char buf2[200];
std::string groupName = "";

int indexOfSelectedModel = 0;
std::string tName = "";

void MainGUIWindow(Camera &camera, Model &model)
{

    ImGui::Begin("General");

    std::string cameraX = "Camera X: " + std::to_string(camera.Position.x);
    std::string cameraY = "Camera Y: " + std::to_string(camera.Position.y);
    std::string cameraZ = "Camera Z: " + std::to_string(camera.Position.z);
    std::string cameraRotX = "Camera Rotation X: " + std::to_string(camera.Orientation.x);
    std::string cameraRotY = "Camera Rotation Y: " + std::to_string(camera.Orientation.y);
    std::string cameraRotZ = "Camera Rotation Z: " + std::to_string(camera.Orientation.z);

    ImGui::Text(cameraX.c_str());
    ImGui::Text(cameraY.c_str());
    ImGui::Text(cameraZ.c_str());
    ImGui::Text(cameraRotX.c_str());
    ImGui::Text(cameraRotY.c_str());
    ImGui::Text(cameraRotZ.c_str());

    ImGui::Checkbox("First Person Mode? ", &setCursor);
    // filesave
    ImGui::InputText("Save Name", buf, sizeof(buf));

    // set name = the buffer
    name = "";
    for (int i = 0; i < buf[i] != '\0'; i++)
    {
        name += buf[i];
    }

    if (ImGui::Button("Save"))
    {
        int modelCount = 0;
        std::ofstream myfile;

        myfile.open(name + std::string(".save"));
        myfile << "a: " << a << "\nb: " << b << "\nlightIntensity: " << lightIntensity << "\nlightColor: " << lightColor.x << " " << lightColor.y << " " << lightColor.z << " " << lightColor.w << "\nlightPos: " << lightPos.x << " " << lightPos.y << " " << lightPos.z << "\nmodelPos: " << modelPos[0] << " " << modelPos[1] << " " << modelPos[2] << "\ncamPos: " << camera.Position.x << " " << camera.Position.y << " " << camera.Position.z << "\ncamRot: " << camera.Orientation.x << " " << camera.Orientation.y << " " << camera.Orientation.z << "\n";
        // myfile << "a: " << a << "   b: " << b << "   lightIntensity: " << lightIntensity << "   lightColor: " << lightColor.x << " " << lightColor.y << " " << lightColor.z << " " << lightColor.w << "   lightPos: " << lightPos.x << " " << lightPos.y << " " << lightPos.z << "   modelPos: " << modelPos[0] << " " << modelPos[1] << " " << modelPos[2] << "   cameraPos: " << camera.Position.x << " " << camera.Position.y << " " << camera.Position.z << std::endl;
        for (Group &g : groups)
        {
            myfile << "-GroupStart-\n";
            myfile << "GroupName: " << g.name << "\n";
            myfile << "NumOfModels: " << g.models.size() << "\n";
            for (Model m : g.models)
            {
                std::cout << m.path << std::endl;
                myfile << m.path << " " << m.x << " " << m.y << " " << m.z << " " << m.rotX << " " << m.rotY << " " << m.rotZ << " " << m.scaleX << " " << m.scaleY << " " << m.scaleZ << " " << m.id << std::endl;
                modelCount++;
            }
            myfile << "-GroupEnd-\n";
        }
        myfile << "-ModelStart-\n";
        for (Model m : models)
        {
            std::cout << m.path << std::endl;
            myfile << m.path << " " << m.x << " " << m.y << " " << m.z << " " << m.rotX << " " << m.rotY << " " << m.rotZ << " " << m.scaleX << " " << m.scaleY << " " << m.scaleZ << std::endl;
        }
        myfile << "-ModelEnd-\n";
        myfile.close();
    }
    // fileload
    if (ImGui::Button("Load Save"))
    {
        ImGuiFileDialog::Instance()->OpenDialog("Choose Save File", "Choose Save File", ".save", ".");

        groups.clear();
        Group scene("Scene");
        groups.push_back(scene);
        models.clear();
    }
    if (ImGuiFileDialog::Instance()->Display("Choose Save File"))
    {
        std::ifstream myfile;
        // action if OK
        if (ImGuiFileDialog::Instance()->IsOk())
        {
            std::string filePathName = ImGuiFileDialog::Instance()->GetFilePathName();
            std::string filePath = ImGuiFileDialog::Instance()->GetCurrentPath();
            // action
            std::replace(filePathName.begin(), filePathName.end(), '\\', '/');

            myfile.open(filePathName.c_str());
            std::string line;
            bool loadingModel = false;
            bool loadingGroup = false;
            std::string tempGroupName = "";
            int numOfModels = 0;
            while (std::getline(myfile, line))
            {
                std::stringstream ss(line);
                std::string word;
                ss >> word;
                if (word == "a:")
                {
                    ss >> a;
                }
                else if (word == "b:")
                {
                    ss >> b;
                }
                else if (word == "lightIntensity:")
                {
                    ss >> lightIntensity;
                }
                else if (word == "lightColor:")
                {
                    ss >> lightColor.x;
                    ss >> lightColor.y;
                    ss >> lightColor.z;
                    ss >> lightColor.w;
                }
                else if (word == "lightPos:")
                {
                    ss >> lightPos.x;
                    ss >> lightPos.y;
                    ss >> lightPos.z;
                }
                else if (word == "modelPos:")
                {
                    ss >> modelPos[0];
                    ss >> modelPos[1];
                    ss >> modelPos[2];
                }
                else if (word == "camPos:")
                {
                    ss >> camera.Position.x;
                    ss >> camera.Position.y;
                    ss >> camera.Position.z;
                }
                else if (word == "camRot:")
                {
                    ss >> camera.Orientation.x;
                    ss >> camera.Orientation.y;
                    ss >> camera.Orientation.z;
                }
                else if (word == "-GroupStart-")
                {
                    std::cout << "group started" << std::endl;
                    loadingGroup = true;
                }
                else if (word == "GroupName:")
                {
                    ss >> tempGroupName;
                    std::cout << "Found name: " << tempGroupName << std::endl;
                }
                else if (word == "NumOfModels:")
                {
                    ss >> numOfModels;
                    std::cout << "count: " << numOfModels << std::endl;
                }
                else if (word == "-ModelStart-")
                {
                    loadingModel = true;
                }
                else if (word == "-ModelEnd-")
                {
                    loadingModel = false;
                }
                else if (loadingGroup)
                {
                    if (word == "-GroupEnd-")
                        continue;
                    bool inScene = false;
                    bool groupCreated = false;
                    if (tempGroupName == "Scene")
                        inScene = true;

                    if (inScene == false)
                        for (Group &g : groups)
                            if (g.name == tempGroupName)
                                groupCreated = true;

                    Group tempGroup(tempGroupName);
                    if (inScene == false && groupCreated == false)
                    {
                        groupCreated = true;
                        groups.push_back(tempGroup);
                    }

                    if (numOfModels > 0)
                    {
                        float x, y, z;
                        float xRot, yRot, zRot;
                        float scaleX, scaleY, scaleZ;
                        std::string path;
                        int id = 0;
                        path = word;
                        ss >> x;
                        ss >> y;
                        ss >> z;
                        ss >> xRot;
                        ss >> yRot;
                        ss >> zRot;
                        ss >> scaleX;
                        ss >> scaleY;
                        ss >> scaleZ;
                        ss >> id;

                        Model m(x, y, z, path.c_str());
                        m.path = path.c_str();
                        m.rotX = xRot;
                        m.rotY = yRot;
                        m.rotZ = zRot;
                        m.scaleX = scaleX;
                        m.scaleY = scaleY;
                        m.scaleZ = scaleZ;
                        m.id = id;

                        // std::cout << "PATH: " << path << std::endl;

                        if (inScene)
                            groups[0].models.push_back(m);
                        else if (inScene == false && groupCreated)
                            for (Group &g : groups)
                                if (g.name == tempGroupName)
                                    g.models.push_back(m);
                    }

                    std::cout << "---- DONE ---" << std::endl;
                }
                else if (word == "-GroupEnd-")
                {
                    std::cout << "group ended" << std::endl;
                    loadingGroup = false;
                }
                else if (loadingModel)
                {

                    std::cout << "inside: " << word << std::endl;

                    std::string path;
                    float x, y, z;
                    float xRot, yRot, zRot;
                    float scaleX, scaleY, scaleZ;
                    path = word;
                    ss >> x;
                    ss >> y;
                    ss >> z;
                    ss >> xRot;
                    ss >> yRot;
                    ss >> zRot;
                    ss >> scaleX;
                    ss >> scaleY;
                    ss >> scaleZ;
                    std::cout << "X: " << x << " Y: " << y << " Z: " << z << " Path: " << path.c_str() << std::endl;
                    Model m(x, y, z, path.c_str());
                    m.path = path.c_str();
                    m.rotX = xRot;
                    m.rotY = yRot;
                    m.rotZ = zRot;
                    m.scaleX = scaleX;
                    m.scaleY = scaleY;
                    m.scaleZ = scaleZ;
                    m.id = models.size();
                    models.push_back(m);

                    // std::cout << m.path << std::endl;
                }
            }
        }

        ImGuiFileDialog::Instance()->Close();
    }

    ImGui::End();

    ImGui::Begin("Light");
    ImGui::SliderFloat("Light X", &lightPos.x, -25.0f, 25.0f, "%.3f");
    ImGui::SliderFloat("Light Y", &lightPos.y, -25.0f, 25.0f, "%.3f");
    ImGui::SliderFloat("Light Z", &lightPos.z, -25.0f, 25.0f, "%.3f");

    ImGui::ColorPicker4("Light Color", colors);
    ImGui::SliderFloat("Light Intensity", &lightIntensity, 0.0f, 30.0f, "%.3f");
    ImGui::SliderFloat("A", &a, 0.0f, 10.0f, "%.3f");
    ImGui::SliderFloat("B", &b, 0.0f, 10.0f, "%.3f");
    ImGui::End();

    ImGui::Begin("Model");

    for (int i = 0; i < groups.size(); i++)
    {
        int numOfWindowsOpen = 0;
        Group &g = groups[i];
        if (g.name != "")
        {
            if (ImGui::CollapsingHeader(g.name.c_str()))
            {
                numOfWindowsOpen = i;
                for (int j = 0; j < g.models.size(); j++)
                {

                    Model &m = g.models[j];
                    if (ImGui::TreeNode(std::string(m.path + " ID: " + std::to_string(m.id) + " PARENT: " + g.name).c_str()))
                    {
                        ImGui::SliderFloat("X", &m.x, -25.0f, 25.0f, "%.3f");
                        ImGui::SliderFloat("Y", &m.y, -25.0f, 25.0f, "%.3f");
                        ImGui::SliderFloat("Z", &m.z, -25.0f, 25.0f, "%.3f");
                        ImGui::SliderFloat("Rot X", &m.rotX, -180.0f, 180.0f, "%.3f");
                        ImGui::SliderFloat("Rot Y", &m.rotY, -180.0f, 180.0f, "%.3f");
                        ImGui::SliderFloat("Rot Z", &m.rotZ, -180.0f, 180.0f, "%.3f");
                        ImGui::SliderFloat("Scale X", &m.scaleX, 0.0f, 10.0f, "%.3f");
                        ImGui::SliderFloat("Scale Y", &m.scaleY, 0.0f, 10.0f, "%.3f");
                        ImGui::SliderFloat("Scale Z", &m.scaleZ, 0.0f, 10.0f, "%.3f");
                        if (ImGui::Button("Duplicate"))
                        {
                            Model m2(m.x, m.y, m.z, m.path.c_str());
                            m2.path = m.path.c_str();
                            m2.rotX = m.rotX;
                            m2.rotY = m.rotY;
                            m2.rotZ = m.rotZ;
                            m2.scaleX = m.scaleX;
                            m2.scaleY = m.scaleY;
                            m2.scaleZ = m.scaleZ;
                            m2.id = g.models.size();
                            g.models.push_back(m2);
                        }
                        if (ImGui::Button("Delete"))
                        {
                            g.models.erase(g.models.begin() + i);
                        }
                        ImGui::TreePop();
                    }
                }
                int L = 0;
                for (int v = 0; v < groups.size(); v++)
                    if (groups[v].name == g.name)
                        L = v;

                if (ImGui::Button(std::string("Add Model to " + g.name).c_str()))
                {
                    ImGuiFileDialog::Instance()->OpenDialog("Add Model", "Add Model", ".gltf", ".");
                    tName = g.name;
                }
                // std::cout << " NAME: " << g.name << std::endl;
                if (ImGuiFileDialog::Instance()->Display("Add Model"))
                {
                    // action if OK
                    if (ImGuiFileDialog::Instance()->IsOk())
                    {
                        std::string filePathName = ImGuiFileDialog::Instance()->GetFilePathName();
                        std::string filePath = ImGuiFileDialog::Instance()->GetCurrentPath();
                        // action
                        std::replace(filePathName.begin(), filePathName.end(), '\\', '/');
                        // std::cout << filePath << " " << filePathName << std::endl;

                        Model newModel(0, 0, 0, filePathName.c_str());
                        // std::cout << filePathName << std::endl;
                        newModel.path = filePathName;
                        newModel.rotX = 0;
                        newModel.rotY = 0;
                        newModel.rotZ = 0;
                        newModel.scaleX = 1;
                        newModel.scaleY = 1;
                        newModel.scaleZ = 1;
                        for (Group &g1 : groups)
                        {
                            if (g1.name == tName)
                            {
                                newModel.id = g1.models.size();
                                g1.models.push_back(newModel);
                            }
                        }
                    }

                    // close
                    ImGuiFileDialog::Instance()->Close();
                }
            }
        }
        // std::cout << numOfWindowsOpen << std::endl;
    }

    if (ImGui::InputText("Group Name", buf2, 200))
    {
        std::cout << "group path: " << buf2 << std::endl;
    }

    if (ImGui::Button("Add Group"))
    {
        if (buf != "" && buf2 != NULL)
        {
            Group g(buf2);
            groups.push_back(g);
        }
    }

    if (ImGui::Button("Add Model To Scene"))
        ImGuiFileDialog::Instance()->OpenDialog("Add Model", "Add Model", ".gltf", ".");

    if (ImGuiFileDialog::Instance()->Display("Add Model"))
    {
        // action if OK
        if (ImGuiFileDialog::Instance()->IsOk())
        {
            std::string filePathName = ImGuiFileDialog::Instance()->GetFilePathName();
            std::string filePath = ImGuiFileDialog::Instance()->GetCurrentPath();
            // action
            std::replace(filePathName.begin(), filePathName.end(), '\\', '/');
            std::cout << filePath << " " << filePathName << std::endl;

            Model newModel(0, 0, 0, filePathName.c_str());
            std::cout << filePathName << std::endl;
            newModel.path = filePathName;
            newModel.id = models.size();
            newModel.rotX = 0;
            newModel.rotY = 0;
            newModel.rotZ = 0;
            newModel.scaleX = 1;
            newModel.scaleY = 1;
            newModel.scaleZ = 1;
            groups[0].models.push_back(newModel);
        }

        // close
        ImGuiFileDialog::Instance()->Close();
    }

    ImGui::End();
}