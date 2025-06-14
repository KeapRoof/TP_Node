
export function checkRole(requiredRole) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized"
            });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({
                status: 403,
                message: `Access denied: ${requiredRole} role required`
            });
        }

        next();
    };
}