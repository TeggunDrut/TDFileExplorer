#include "Group.h"

Group::Group(std::string name)
{
    Group::name = name;
}
void Group::AddModel(Model &model)
{
    models.push_back(model);
}
void Group::Draw(Shader &shader, Camera &camera)
{
    for (Model m : models)
    {
        m.Draw(shader, camera);
    }
}