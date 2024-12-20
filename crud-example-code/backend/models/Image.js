const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: String,
    path: String,
    ingredients: {
        type: [String],
        required: true,
        validate: {
            validator: function (array) {
                return array.length > 0;
            },
            message: 'Ingredients array must contain at least one item'
        }
    },
    description: String,
}, { timestamps: true });

const Image = mongoose.model("Image", imageSchema, "dish");

module.exports = Image;