#include "Voxel.h"

GLuint Voxel::LoadShaders(const char *vertex_file_path, const char *fragment_file_path)
{

  // Create the shaders
  GLuint VertexShaderID = glCreateShader(GL_VERTEX_SHADER);
  GLuint FragmentShaderID = glCreateShader(GL_FRAGMENT_SHADER);

  // Read the Vertex Shader code from the file
  std::string VertexShaderCode;
  std::ifstream VertexShaderStream(vertex_file_path, std::ios::in);
  if (VertexShaderStream.is_open())
  {
    std::stringstream sstr;
    sstr << VertexShaderStream.rdbuf();
    VertexShaderCode = sstr.str();
    VertexShaderStream.close();
  }
  else
  {
    printf("Impossible to open %s. Are you in the right directory ? Don't forget to read the FAQ !\n", vertex_file_path);
    getchar();
    return 0;
  }

  // Read the Fragment Shader code from the file
  std::string FragmentShaderCode;
  std::ifstream FragmentShaderStream(fragment_file_path, std::ios::in);
  if (FragmentShaderStream.is_open())
  {
    std::stringstream sstr;
    sstr << FragmentShaderStream.rdbuf();
    FragmentShaderCode = sstr.str();
    FragmentShaderStream.close();
  }

  GLint Result = GL_FALSE;
  int InfoLogLength;

  // Compile Vertex Shader
  printf("Compiling shader : %s\n", vertex_file_path);
  char const *VertexSourcePointer = VertexShaderCode.c_str();
  glShaderSource(VertexShaderID, 1, &VertexSourcePointer, NULL);
  glCompileShader(VertexShaderID);

  // Check Vertex Shader
  glGetShaderiv(VertexShaderID, GL_COMPILE_STATUS, &Result);
  glGetShaderiv(VertexShaderID, GL_INFO_LOG_LENGTH, &InfoLogLength);
  if (InfoLogLength > 0)
  {
    std::vector<char> VertexShaderErrorMessage(InfoLogLength + 1);
    glGetShaderInfoLog(VertexShaderID, InfoLogLength, NULL, &VertexShaderErrorMessage[0]);
    printf("%s\n", &VertexShaderErrorMessage[0]);
  }

  // Compile Fragment Shader
  printf("Compiling shader : %s\n", fragment_file_path);
  char const *FragmentSourcePointer = FragmentShaderCode.c_str();
  glShaderSource(FragmentShaderID, 1, &FragmentSourcePointer, NULL);
  glCompileShader(FragmentShaderID);

  // Check Fragment Shader
  glGetShaderiv(FragmentShaderID, GL_COMPILE_STATUS, &Result);
  glGetShaderiv(FragmentShaderID, GL_INFO_LOG_LENGTH, &InfoLogLength);
  if (InfoLogLength > 0)
  {
    std::vector<char> FragmentShaderErrorMessage(InfoLogLength + 1);
    glGetShaderInfoLog(FragmentShaderID, InfoLogLength, NULL, &FragmentShaderErrorMessage[0]);
    printf("%s\n", &FragmentShaderErrorMessage[0]);
  }

  // Link the program
  printf("Linking program\n");
  GLuint ProgramID = glCreateProgram();
  glAttachShader(ProgramID, VertexShaderID);
  glAttachShader(ProgramID, FragmentShaderID);
  glLinkProgram(ProgramID);

  // Check the program
  glGetProgramiv(ProgramID, GL_LINK_STATUS, &Result);
  glGetProgramiv(ProgramID, GL_INFO_LOG_LENGTH, &InfoLogLength);
  if (InfoLogLength > 0)
  {
    std::vector<char> ProgramErrorMessage(InfoLogLength + 1);
    glGetProgramInfoLog(ProgramID, InfoLogLength, NULL, &ProgramErrorMessage[0]);
    printf("%s\n", &ProgramErrorMessage[0]);
  }

  glDetachShader(ProgramID, VertexShaderID);
  glDetachShader(ProgramID, FragmentShaderID);

  glDeleteShader(VertexShaderID);
  glDeleteShader(FragmentShaderID);

  return ProgramID;
}

Voxel::Voxel(float x, float y, float z, float width, float height, float depth, Shader &shader, Texture textures[])
{
  Voxel::x = x;
  Voxel::y = y;
  Voxel::z = z;
  Voxel::width = width;
  Voxel::height = height;
  Voxel::depth = depth;

  // Voxel::programID = LoadShaders("src/redSource.vert", "src/redFrag.frag");

  Voxel::shaders.push_back(shader);

  float w = width / 2;
  float h = height / 2;
  float d = depth / 2;

  Vertex vertices[] =
      {
          //               COORDINATES           /            COLORS          /           TexCoord         /       NORMALS         //
          Vertex{glm::vec3(x - w, y - h, z + d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(0.0f, 0.0f)}, // back left
          Vertex{glm::vec3(x - w, y - h, z - d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(0.0f, 1.0f)}, // top left
          Vertex{glm::vec3(x + w, y - h, z - d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(1.0f, 1.0f)}, // top right
          Vertex{glm::vec3(x + w, y - h, z + d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(1.0f, 0.0f)}, // bottom right

          Vertex{glm::vec3(x - w, y + h, z + d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(0.0f, 0.0f)}, // back left
          Vertex{glm::vec3(x - w, y + h, z - d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(0.0f, 1.0f)}, // top left
          Vertex{glm::vec3(x + w, y + h, z - d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(1.0f, 1.0f)}, // top right
          Vertex{glm::vec3(x + w, y + h, z + d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(1.0f, 0.0f)}, // bottom right

          Vertex{glm::vec3(x - w, y - h, z + d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(0.0f, 0.0f)}, // back left
          Vertex{glm::vec3(x - w, y + h, z + d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(0.0f, 1.0f)}, // top left
          Vertex{glm::vec3(x - w, y + h, z - d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(1.0f, 1.0f)}, // top right
          Vertex{glm::vec3(x - w, y - h, z - d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(1.0f, 0.0f)}, // bottom right

          Vertex{glm::vec3(x + w, y - h, z + d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(0.0f, 0.0f)}, // back left
          Vertex{glm::vec3(x + w, y + h, z + d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(0.0f, 1.0f)}, // top left
          Vertex{glm::vec3(x + w, y + h, z - d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(1.0f, 1.0f)}, // top right
          Vertex{glm::vec3(x + w, y - h, z - d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(1.0f, 0.0f)}, // bottom right

          Vertex{glm::vec3(x + w, y - h, z - d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(0.0f, 0.0f)}, // back left
          Vertex{glm::vec3(x + w, y + h, z - d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(0.0f, 1.0f)}, // top left
          Vertex{glm::vec3(x - w, y + h, z - d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(1.0f, 1.0f)}, // top right
          Vertex{glm::vec3(x - w, y - h, z - d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(1.0f, 0.0f)}, // bottom right

          Vertex{glm::vec3(x + w, y - h, z + d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(0.0f, 0.0f)}, // back left
          Vertex{glm::vec3(x + w, y + h, z + d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(0.0f, 1.0f)}, // top left
          Vertex{glm::vec3(x - w, y + h, z + d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(1.0f, 1.0f)}, // top right
          Vertex{glm::vec3(x - w, y - h, z + d), glm::vec3(0.0f, 1.0f, 0.0f), glm::vec3(1.0f, 1.0f, 1.0f), glm::vec2(1.0f, 0.0f)}, // bottom right

      };

  GLuint indices[] =
      {
          // bottom face
          0, 1, 2,
          0, 2, 3,

          // top face
          4, 5, 6,
          4, 6, 7,

          // left face
          8, 9, 10,
          8, 10, 11,

          // right face
          12, 13, 14,
          12, 14, 15,

          // back face
          16, 17, 18,
          16, 18, 19,

          // front face
          20, 21, 22,
          20, 22, 23};

  std::vector<Vertex> verts(vertices, vertices + sizeof(vertices) / sizeof(Vertex));
  std::vector<GLuint> ind(indices, indices + sizeof(indices) / sizeof(GLuint));
  std::vector<Texture> tex(textures, textures + sizeof(textures) / sizeof(Texture));

  Mesh m(verts, ind, tex);
  Voxel::meshes.push_back(m);
}
void Voxel::Draw(Shader &shader, Camera &camera)
{
  // prevent drawing of none seen voxel
  if (camera.FrustumCulling(position, size))
    return;
  for (Mesh m : Voxel::meshes)
  {
    m.Draw(shader, camera, glm::mat4(1.0f), glm::vec3(Voxel::x, Voxel::y, Voxel::z));
  }
}