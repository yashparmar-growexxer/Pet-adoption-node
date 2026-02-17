import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

adoptionSchema.index({ user: 1, pet: 1 }, { unique: true });

const Adoption = mongoose.model('Adoption', adoptionSchema);

export default Adoption;

