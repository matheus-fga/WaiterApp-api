import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export enum Roles {
  WAITER = 'WAITER',
  ADMIN = 'ADMIN'
}

const userSchema = new Schema({
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
  role: {
    type: String,
    enum: Object.keys(Roles),
    default: Roles.WAITER,
  }
});

userSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
  }
});

export const User = model('User', userSchema);
