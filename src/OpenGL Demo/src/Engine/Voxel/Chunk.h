#ifndef CHUNK_H
#define CHUNK_H
#include <vector>
#include "Voxel.h"
#include "Layer.h"

class Chunk {
  public:
    float maxX = -99999;
    float maxY = -99999;
    float maxZ = -99999;
    std::vector<Voxel> voxels;
    void Activate();
    void Draw(Shader &shader, Camera &camera);
};

#endif // DEBUG