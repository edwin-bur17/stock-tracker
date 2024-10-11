import mongoose, { Model, Schema } from "mongoose";

interface IUser {
  fullname: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  fullname: {
    type: String,
    required: [true, "Por favor, digita un nombre completo"],
    maxlength: [40, "El nombre no puede tener más de 40 carácteres"]
  },
  email: {
    type: String,
    required: [true, "Por favor, digita un correo"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: (v: string) => {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Por favor, digita un correo válido"
    }
  },
  password: {
    type: String,
    required: [true, "Por favor digita una contraseña"],
    minlength: [8, "La contraseña debe tener mínimo 8 carácteres"],
    select: false
  }
}, { timestamps: true });

const User: Model<IUser > = mongoose.models.User || mongoose.model("User ", UserSchema);

export default User;