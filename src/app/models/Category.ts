import { model, Schema } from 'mongoose';

export const Categoty = model('Category', new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
}));
