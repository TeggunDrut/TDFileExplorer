#ifndef GROUP_H
#define GROUP_H

#include <vector>
#include <string>
#include "../Model/Model.h"
#include "../ShaderClass/ShaderClass.h"
#include "../Camera/Camera.h"

class Group {
    public:
        Group(std::string name);
        void AddModel(Model &model);
        void Draw(Shader &shader, Camera &camera);
        std::vector<Model> models;
        std::string name;
};

#endif