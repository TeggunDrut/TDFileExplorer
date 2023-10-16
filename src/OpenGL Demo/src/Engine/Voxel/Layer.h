#ifndef LAYER_H
#define LAYER_H
#include "Voxel.h"
#include <vector>
class Layer
{
public:
  float x;
  float y;
  float z;
  std::vector<Voxel> voxelLayer;
  int xSize;
  int ySize;
  int zSize;
  float incr = .5f;
  Layer(float xSize, float ySize, float zSize)
  {
    Layer::xSize = xSize;
    Layer::ySize = ySize;
    Layer::zSize = zSize;
  };
  void Activate()
  {
    Shader shader1("src/default.vert", "src/shaders/default.frag");
    Texture grassTextures[]{
        Texture("textures/grass_block.png", "diffuse", 0, GL_RGBA, GL_UNSIGNED_BYTE)};

    for (float xOff = 0; xOff < Layer::xSize; xOff += 1)
    {
      {
        for (float zOff = 0; zOff < Layer::zSize; zOff += 1)
        {
          Voxel v(xOff * (.5) /* sizeX */, .5 /* sizeY */, zOff * (.5) /* sizeZ */, 1, 1, 1, shader1, grassTextures);
          Layer::voxelLayer.push_back(v);
        }
      }
    }
  };
  void Draw(Shader &shader, Camera &camera)
  {
    for (Voxel v : Layer::voxelLayer)
    {
      v.Draw(shader, camera);
    }
  };
  void Update(){

  };
};

#endif // DEBUG