import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  Country: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  Code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    minlength: 2,
    maxlength: 2
  }
}, {
  timestamps: true,
  collection: 'countries'
});

const Country = mongoose.model('Country', countrySchema);

export default Country;