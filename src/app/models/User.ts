import { model, Schema } from 'mongoose';

export enum Roles {
  WAITER = 'WAITER',
  ADMIN = 'ADMIN'
}

export const User = model('User', new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: String,
    enum: Object.keys(Roles),
    default: Roles.WAITER,
  }
}));
