const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number },
    genre: { type: String },
    summary: { type: String },
    price: { 
        type: mongoose.Decimal128, 
        required: true, 
        get: v => v?.toString() 
    },
    currency: { type: String, default: 'AUD' }
}, {
    toJSON: { getters: true, virtuals: false, transform(doc, ret) { delete ret.__v; return ret; } },
    toObject: { getters: true, virtuals: false }
});

module.exports = mongoose.model('Book', BookSchema);