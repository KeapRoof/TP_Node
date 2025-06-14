import UserService from "../services/user.services.js";

export async function Signup(req, res) {
    try {
        const { name, email, password, role } = req.body;

        // Vérification du rôle
        if (role === "admin") {
            if (!req.user || req.user.role !== "admin") {
                return res.status(403).json({
                    status: 403,
                    message: "You don't have permission to create an admin user."
                });
            }
        }

        const newUser = await UserService.Signup({
            name,
            email,
            password,
            role
        });

        return res.status(201).json({
            status: 201,
            message: "User successfully created.",
            data: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: err.message
        });
    }
};

export async function DeleteUser(req, res) {
    try {
        const userId = req.params.id;

        if (!req.user || (req.user.role !== "admin" && req.user.userId !== userId)) {
        return res.status(403).json({
            status: 403,
            message: "You don't have permission to delete this user."
        });
    }

        const deletedUser = await UserService.DeleteUser(userId);

        return res.status(200).json({
            status: 200,
            message: "User successfully deleted.",
            data: deletedUser
        });
    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

export async function UpdateUser(req, res) {
    try {
        const userId = req.params.id;
        const { name, email, password, role } = req.body;

        // Vérification des permissions
        if (!req.user || (req.user.role !== "admin" && req.user.id !== userId)) {
            return res.status(403).json({
                status: 403,
                message: "You don't have permission to update this user."
            });
        }

        const updatedUser = await UserService.UpdateUser(userId, {
            name,
            email,
            password,
            role
        });

        return res.status(200).json({
            status: 200,
            message: "User successfully updated.",
            data: updatedUser
        });
    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

export async function Login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await UserService.Login({ email, password });

        return res.status(200).json({
            status: 200,
            message: "User successfully logged in.",
            data: {
                id: user.user.id,
                role: user.user.role,
                token: user.token
            }
        });
    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: err.message
        });
    }
}

export default {
    Signup,
    Login,
    DeleteUser,
    UpdateUser
};