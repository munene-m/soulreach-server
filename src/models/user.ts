import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  churchName: string;
  region: string;
  subRegionalOverseer?: string;
  regionalOverseer?: string;
  password: string;
  role: "PASTOR" | "REGIONAL_OVERSEER" | "SUB_REGIONAL_OVERSEER" | "BISHOP";
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  churchName: {
    type: String, 
    required: true,
    trim: true
  },
  region: {
    type: String,
    required: true,
    trim: true
  },
  subRegionalOverseer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function(this: IUser) {
      return ['PASTOR'].includes(this.role); //If someone is creating a PASTOR user, they must specify their subRegionalOverseer
    }
  },
  regionalOverseer: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: function(this: IUser) {
      return ['PASTOR', 'SUB_REGIONAL_OVERSEER'].includes(this.role); // If someone is creating a PASTOR user, they must specify their regionalOverseer
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['PASTOR', 'REGIONAL_OVERSEER', 'SUB_REGIONAL_OVERSEER', 'BISHOP'],
    required: true
  },
  refreshToken: {
    type: String
  }
}, {
  timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
