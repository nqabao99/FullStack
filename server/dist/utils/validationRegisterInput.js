"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterInput = void 0;
const validateRegisterInput = (registerInput) => {
    if (!registerInput.email.includes("@"))
        return {
            message: "Invalid email",
            error: [{ field: "email", message: "Email must include @ symbol" }],
        };
    if (registerInput.username.length <= 2)
        return {
            message: "Invalid username",
            error: [{ field: "username", message: "Length must be greater than 2" }],
        };
    if (registerInput.username.includes("@"))
        return {
            message: "Invalid username",
            error: [{ field: "username", message: "Email canot include @" }],
        };
    if (registerInput.password.length <= 2)
        return {
            message: "Invalid password",
            error: [{ field: "password", message: "Length must be greater than 2" }],
        };
    return null;
};
exports.validateRegisterInput = validateRegisterInput;
//# sourceMappingURL=validationRegisterInput.js.map