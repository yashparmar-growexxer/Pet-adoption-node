import mongoose from 'mongoose';

const speciesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a species name'],
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

const Species = mongoose.model('Species', speciesSchema);

export default Species;

