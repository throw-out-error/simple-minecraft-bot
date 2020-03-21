const Vec3 = require('vec3').Vec3;

class Node {
    constructor(vector, avoid) {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.vector = vector;
        this.avoid = avoid; // whether this node is a wall (not air)
        this.neighbors = [];
        this.previous = null;
    }

    addNeighbors(grid, cols, rows) { // TODO; turn cols and rows into Grid class.
        var i = this.vector.x;
        var j = this.vector.y;
        var k = this.vector.z;

        if (i < cols - 1) {
            this.neighbors[this.neighbors.Length - 1] = grid[i+1[j[k]]];
        }

        if (i > 0) {
            this.neighbors[this.neighbors.Length - 1] = grid[i-1[j[k]]];
        }

        if (j < rows - 1) {
            this.neighbors[this.neighbors.Length - 1] = grid[i[j[k + 1]]];
        }

        if (j > 0) {
            this.neighbors[this.neighbors.Length - 1] = grid[i[j[k - 1]]];
        }
    }
}


module.exports = Node;