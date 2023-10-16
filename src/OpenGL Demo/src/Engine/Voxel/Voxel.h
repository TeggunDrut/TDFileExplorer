#ifndef VOXEL_H
#define VOXEL_H
#include <glad/glad.h>
#include <GLFW/glfw3.h>

#include "../Vector.h"
#include "../ShaderClass/shaderClass.h"
#include "../Mesh/Mesh.h"
#include <vector>

// class Voxel
// {
// public:
//   float x, y, z;
//   float width, height, depth;
  
//   bool drawTop = false;
//   bool drawBottom = false;
//   bool drawLeft = false;
//   bool drawRight = false;
//   bool drawFront = false;
//   bool drawBack = false;

//   GLuint LoadShaders(const char *vertex_file_path, const char *fragment_file_path);
  
//   std::vector<Mesh> meshes;
//   std::vector<Shader> shaders;

//   Voxel(float x, float y, float z, float width, float height, float depth, Shader &shader, Texture texture[]);
//   void Draw(Shader &shader, Camera &camera);
// };

// create a Voxel class which has a x, y, and z
// the Voxel class will also had a Draw frunction with the parameters of a shader and a camera
// the Voxel class will also have a width, height, and depth
// the Voxel class will have a function which draws only visible sides of the Voxel

class Voxel
{
public:
  float x, y, z;
  float width, height, depth;
  
  bool drawTop = false;
  bool drawBottom = false;
  bool drawLeft = false;
  bool drawRight = false;
  bool drawFront = false;
  bool drawBack = false;

  GLuint LoadShaders(const char *vertex_file_path, const char *fragment_file_path);
  
  std::vector<Mesh> meshes;
  std::vector<Shader> shaders;

  Voxel(float x, float y, float z, float width, float height, float depth, Shader &shader, Texture texture[]);
  void Draw(Shader &shader, Camera &camera);

};

#endif // !VOXEL_H