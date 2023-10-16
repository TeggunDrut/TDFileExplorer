#ifndef RAY_H
#define RAY_H
#include <cmath>
#include <glm/glm.hpp>

class Ray {
public:
    Ray() {}
    Ray(const glm::vec3& a, const glm::vec3& b) { A = a; B = b; }
    glm::vec3 origin() const { return A; }
    glm::vec3 direction() const { return B; }
    glm::vec3 point_at_parameter(float t) const { return A + t*B; }

    glm::vec3 A;
    glm::vec3 B;
    glm::vec3 C; // head
};


#endif