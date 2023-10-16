function leaky_relu(x) {
    if (x >= 0) {
        return x;
    } else {
        return 0.01 * x;
    }
}

function leaky_relu_derivative(y) {
    if (y >= 0) {
        return 1;
    } else {
        return 0.01;
    }
}

function tanh(x) {
    return Math.tanh(x);
}

function tanh_derivative(y) {
    return 1 - y * y;
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-1 * x));
}

function sigmoid_derivative(y) {
    return y * (1 - y);
}

function relu(x) {
    if (x >= 0) {
        return x;
    } else {
        return 0;
    }
}

function relu_derivative(y) {
    if (y > 0) {
        return 1;
    } else {
        return 0;
    }
}
function linear(x) {
    return x;
}

function linear_derivative(y) {
    return 1;
}

class NeuralNetwork {
    constructor(
        layerArray,
        layerActivations = [
            {
                activation: sigmoid,
                derivative: sigmoid_derivative,
            },
            {
                activation: sigmoid,
                derivative: sigmoid_derivative,
            },
            {
                activation: sigmoid,
                derivative: sigmoid_derivative,
            },
            {
                activation: sigmoid,
                derivative: sigmoid_derivative,
            },
        ]
    ) {
        this.layerNodeCounts = layerArray; // no of neurons per layer
        this.layers_count = layerArray.length; //total number of layers
        this.layerActivations = layerActivations; // activation function for each layer
        console.log(this.layerActivations);
        this.weights = []; //array of weights matrices in order

        const { layerNodeCounts: layerNodeCounts } = this;

        for (let i = 0; i < layerNodeCounts.length - 1; i++) {
            let weights_mat = new Matrix(
                layerNodeCounts[i + 1],
                layerNodeCounts[i]
            );
            weights_mat.randomize();
            this.weights.push(weights_mat);
        }

        this.biases = []; //array of bias matrices in order

        for (let i = 1; i < layerNodeCounts.length; i++) {
            let bias_mat = new Matrix(layerNodeCounts[i], 1);
            bias_mat.randomize();
            this.biases.push(bias_mat);
        }

        NeuralNetwork.SIGMOID = 1;
        NeuralNetwork.ReLU = 2;

        this.activation = null;
        this.activation_derivative = null;
        this.learningRate = 0.2;
        this.loss = 0;

        this.layers = [];
        this.connections = [];

        this.init();
    }
    init() {
        this.layers.forEach((layer) => {
            layer.create();
        });
    }

    feedforward(input_array, getAllLayers, round = false) {
        const { layers_count } = this;

        if (!this.feedforwardArgsValidator(input_array)) {
            return -1;
        }

        let layers = []; //This will be array of layer arrays

        //input layer
        layers[0] = Matrix.fromArray(input_array);

        for (let i = 1; i < layers_count; i++) {
            layers[i] = Matrix.multiply(this.weights[i - 1], layers[i - 1]);
            layers[i].add(this.biases[i - 1]);
            layers[i].map(this.layerActivations[i].activation); //activation
        }
        if (round) {
            let arr = layers[layers.length - 1]
                .toArray()
                .map((x) => Math.round(x)); //output layer array (rounded
            let newArr = [];
            for (let i = 0; i < arr.length; i += 8) {
                newArr.push(arr.slice(i, i + 8));
            }
            return newArr;
        }
        if (getAllLayers == true) {
            return layers; //all layers (array of layer matrices)
        } else {
            return layers[layers.length - 1].toArray(); //output layer array
        }
    }

    // Mutates weights and biases of ANN based on rate given
    mutate(rate) {
        //rate 0 to 1
        function mutator(val) {
            if (Math.random() < rate) {
                return val + Math.random() * 2 - 1;
            } else {
                return val;
            }
        }

        for (let i = 0; i < this.weights.length; i++) {
            this.weights[i].map(mutator);
            this.biases[i].map(mutator);
        }
    }

    // Returns a copy of ANN (instead of reference to original one)
    copy() {
        let new_ann = new NeuralNetwork(this.layerNodeCounts);
        for (let i = 0; i < new_ann.weights.length; i++) {
            new_ann.weights[i] = this.weights[i].copy();
        }
        for (let i = 0; i < new_ann.biases.length; i++) {
            new_ann.biases[i] = this.biases[i].copy();
        }
        return new_ann;
    }

    // Trains with backpropogation
    train(inputs, targets, lr = 0.1, draw = false) {
        if (!this.trainArgsValidater(inputs, targets)) {
            return -1;
        }

        let layers = this.feedforward(inputs, true); //layer matrices
        let target_matrix = Matrix.fromArray(targets);

        let prev_error;

        for (
            let layer_index = layers.length - 1;
            layer_index >= 1;
            layer_index--
        ) {
            /* right and left are in respect to the current layer */
            let layer_matrix = layers[layer_index];

            let layer_error;
            //Error calculation
            if (layer_index == layers.length - 1) {
                // Output layer
                layer_error = Matrix.add(
                    target_matrix,
                    Matrix.multiply(layer_matrix, -1)
                );
            } else {
                //Hidden layer
                const right_weights = this.weights[layer_index];
                const right_weigths_t = Matrix.transpose(right_weights);
                layer_error = Matrix.multiply(right_weigths_t, prev_error);
            }
            prev_error = layer_error.copy(); //will be used for error calculation in hidden layers

            // Calculating layer gradient
            const layer_gradient = Matrix.map(
                layer_matrix,
                this.layerActivations[layer_index].derivative
            );
            layer_gradient.multiply(layer_error);
            layer_gradient.multiply(lr);

            //Calculating delta weights
            const left_layer_t = Matrix.transpose(layers[layer_index - 1]);
            const left_weights_delta = Matrix.multiply(
                layer_gradient,
                left_layer_t
            );

            //Updating weights and biases
            this.weights[layer_index - 1].add(left_weights_delta);
            this.biases[layer_index - 1].add(layer_gradient);

            // calcuate loss
            let prediction = Matrix.fromArray(this.feedforward(inputs));
            let expected = Matrix.fromArray(targets);
            let difference = Matrix.subtract(prediction, expected);
            this.loss = difference.data[0][0] * difference.data[0][0];

            //Iterate over each layer, except the last one
            if (draw)
                for (let i = 0; i < this.layers.length - 1; i++) {
                    let layer = this.layers[i];
                    //Flatten the weights data twice, for easier mapping with connections
                    let flatWeights = this.weights[i].data.flat(2);
                    //Iterate over each connection from the layer
                    for (let j = 0; j < layer.connections.length; j++) {
                        let connection = layer.connections[j];
                        //Set the connections weight to match the NN
                        connection.weight = flatWeights[j];
                        //Update the visual representation of the connection
                        if (connection.weight > 0)
                            connection.ele.style.backgroundColor = `rgba(255, 0, 0, ${Math.abs(
                                connection.weight / 2
                            )})`;
                        else
                            connection.ele.style.backgroundColor = `rgba(0, 0, 255, ${Math.abs(
                                connection.weight / 2
                            )})`;

                        connection.update();
                    }
                }

            // this.layers.forEach((layer) => {
            //   layer.update();
            // });
        }
    }

    activation(x) {
        return this.activation(x);
    }

    setActivation(TYPE) {
        switch (TYPE) {
            case NeuralNetwork.SIGMOID:
                this.activation = NeuralNetwork.sigmoid;
                this.activation_derivative = NeuralNetwork.sigmoid_derivative;
                break;
            case NeuralNetwork.ReLU:
                this.activation = NeuralNetwork.relu;
                this.activation_derivative = NeuralNetwork.relu_derivative;
                break;
            default:
                console.error(
                    "Activation type invalid, setting sigmoid by default"
                );
                this.activation = NeuralNetwork.sigmoid;
                this.activation_derivative = NeuralNetwork.sigmoid_derivative;
        }
    }

    crossover(ann) {
        if (!this.crossoverValidator(ann)) {
            return -1;
        }
        const offspring = new NeuralNetwork(this.layerNodeCounts);
        for (let i = 0; i < this.weights.length; i++) {
            if (Math.random() < 0.5) {
                offspring.weights[i] = this.weights[i];
            } else {
                offspring.weights[i] = ann.weights[i];
            }

            if (Math.random() < 0.5) {
                offspring.biases[i] = this.biases[i];
            } else {
                offspring.biases[i] = ann.biases[i];
            }
        }
        return offspring;
    }

    // Argument validator functions
    feedforwardArgsValidator(input_array) {
        let invalid = false;
        if (input_array.length != this.layerNodeCounts[0]) {
            invalid = true;
            console.error(
                "Feedforward failed : Input array and input layer size doesn't match."
            );
        }
        return invalid ? false : true;
    }

    trainArgsValidater(input_array, target_array) {
        let invalid = false;
        if (input_array.length != this.layerNodeCounts[0]) {
            console.log(input_array.length, this.layerNodeCounts[0]);
            console.error(
                "Training failed : Input array and input layer size doesn't match."
            );
            invalid = true;
        }
        if (
            target_array.length != this.layerNodeCounts[this.layers_count - 1]
        ) {
            invalid = true;
            console.error(
                "Training failed : Target array and output layer size doesn't match."
            );
        }
        return invalid ? false : true;
    }

    crossoverValidator(ann) {
        let invalid = false;
        if (ann instanceof NeuralNetwork) {
            if (this.layers_count == ann.layers_count) {
                for (let i = 0; i < this.layers_count; i++) {
                    if (this.layerNodeCounts[i] != ann.layerNodeCounts[i]) {
                        console.error(
                            "Crossover failed : Architecture mismatch (Different number of neurons in one or more layers)."
                        );
                        invalid = true;
                        break;
                    }
                }
            } else {
                invalid = true;
                console.error(
                    "Crossover failed : Architecture mismatch (Different number of layers)."
                );
            }
        } else {
            invalid = true;
            console.error("Crossover failed : NeuralNetwork object expected.");
        }
        return invalid ? false : true;
    }
}
