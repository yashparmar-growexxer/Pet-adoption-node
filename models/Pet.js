import mongoose from 'mongoose';

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a pet name'],
      trim: true,
    },
    species: {
      type: String,
      required: [true, 'Please provide a species'],
      trim: true,
    },
    breed: {
      type: String,
      required: [true, 'Please provide a breed'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Please provide an age'],
      min: 0,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    status: {
      type: String,
      enum: ['Available', 'Adopted'],
      default: 'Available',
    },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model('Pet', petSchema);

export default Pet;

