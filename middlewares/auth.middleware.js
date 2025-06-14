import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

export function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "Access token required"
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: 403,
                message: "Invalid or expired token"
            });
        }

        req.user = decoded;
        next();
    });
}