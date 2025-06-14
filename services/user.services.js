import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

const Signup = async ({ name, email, password, role }) => {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists with this email.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        role: role || "user"
    });

    const savedUser = await newUser.save();

    return {
        id: savedUser._id,
        email: savedUser.email,
        role: savedUser.role
    };
};

const DeleteUser = async (userId) => {
    const deletedUser = await UserModel.findByIdAndDelete(userId);
    if (!deletedUser) {
        throw new Error("User not found.");
    }
    return {
        message: "User successfully deleted.",
        user: {
            id: deletedUser._id
        }
    };
};

const UpdateUser = async (userId, updateData) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found.");
    }

    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

    return {
        message: "User successfully updated.",
        user: {
            id: updatedUser._id,
            email: updatedUser.email,
            role: updatedUser.role
        }
    };
}

const Login = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password.");
    }

    const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

    return {
        message: "Login successful",
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role
        }
    };
};

const UserService = {
    Signup,
    Login,
    DeleteUser,
    UpdateUser
};

export default UserService;