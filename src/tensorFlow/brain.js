import * as tf from '@tensorflow/tfjs';
import sm from '../assets/my-model.json'







class Brain {

    constructor(a, b, c, d) {
        tf.setBackend('cpu')
        if (a instanceof tf.Sequential) {
            this.model = a;
            this.input_nodes = b;
            this.hidden_nodes = c;
            this.output_nodes = d;
        } else {
            this.input_nodes = a;
            this.hidden_nodes = b;
            this.output_nodes = c;
            this.model = this.createModel();
            //this.loadModel();

        }



    }

    async loadModel() {
        this.model = await tf.loadLayersModel(sm);
        
    }

    predict(inputs) {
        const xs = tf.tensor2d([inputs])
        const ys = this.model.predict(xs);
        const data = ys.dataSync();
        return data;
    }


    copy() {
        let copy = this.createModel();
        let weights = this.model.getWeights();
        let copyWeights = [];
        for (let i = 0; i < weights.length; i++) {
            copyWeights[i] = weights[i].clone()
        }
        copy.setWeights(copyWeights);
        return new Brain(copy, this.input_nodes, this.hidden_nodes, this.output_nodes);
    }


    createModel() {
        const model = tf.sequential();
        const hidden = (tf.layers.dense({
            units: this.hidden_nodes,
            inputShape: [this.input_nodes],
            activation: 'sigmoid'
        }));
        model.add(hidden);
        const output = (tf.layers.dense({
            units: this.output_nodes,

            activation: 'softmax'
        }));
        model.add(output);
        return model;
    }






    mutate(rate) {
        const weights = this.model.getWeights();
        const mutatedWeights = [];
        for (let i = 0; i < weights.length; i++) {
            let tensor = weights[i];
            let values = tensor.dataSync().slice();
            let shape = tensor.shape;
            for (let j = 0; j < values.length; j++) {
                if (Math.random() < rate) {
                    let w = values[j];
                    values[j] = w * this.getRandom(-1, 1);
                }
            }
            let newTensor = tf.tensor(values, shape)
            mutatedWeights[i] = newTensor;
        }
        this.model.setWeights(mutatedWeights)
    }



    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }









    async saveModel() {
        await this.model.save('downloads://my-model');
    }





}

export default Brain;