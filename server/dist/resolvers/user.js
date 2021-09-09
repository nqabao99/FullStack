"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const constants_1 = require("../constants");
const argon2_1 = __importDefault(require("argon2"));
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const RegisterInput_1 = require("../types/RegisterInput");
const UserMutationResponse_1 = require("../types/UserMutationResponse");
const validationRegisterInput_1 = require("../utils/validationRegisterInput");
const LoginInput_1 = require("../types/LoginInput");
let UserResolver = class UserResolver {
    async register(registerInput, { req }) {
        const validareRegisterInputError = (0, validationRegisterInput_1.validateRegisterInput)(registerInput);
        if (validareRegisterInputError !== null)
            return Object.assign({ code: 400, success: false }, validareRegisterInputError);
        try {
            const { username, email, password } = registerInput;
            const existingUser = await User_1.User.findOne({
                where: [{ username }, { email }],
            });
            if (existingUser)
                return {
                    code: 400,
                    success: false,
                    message: "Duplicated username or email",
                    error: [
                        {
                            field: existingUser.username === username ? "username" : "email",
                            message: `${existingUser.username === username ? "Username" : "Email"} already taken`,
                        },
                    ],
                };
            const hashedPassword = await argon2_1.default.hash(password);
            const newUser = User_1.User.create({
                username,
                password: hashedPassword,
                email,
            });
            await User_1.User.save(newUser);
            req.session.userId = newUser.id;
            return {
                code: 200,
                success: true,
                message: "User registrastion successful",
                user: newUser,
            };
        }
        catch (error) {
            console.log(error);
            return {
                code: 500,
                success: false,
                message: `Internal server error ${error.message}`,
            };
        }
    }
    async login({ usernameOrEmail, password }, { req }) {
        try {
            const existringUser = await User_1.User.findOne(usernameOrEmail.includes("@")
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail });
            if (!existringUser)
                return {
                    code: 400,
                    success: false,
                    message: "User not found",
                    error: [
                        {
                            field: "usernameOrEmail",
                            message: "Username or email incorrect",
                        },
                    ],
                };
            const passwordValid = await argon2_1.default.verify(existringUser.password, password);
            if (!passwordValid)
                return {
                    code: 400,
                    success: false,
                    message: "Wrong password",
                    error: [{ field: "password", message: "Wrong passwrod" }],
                };
            req.session.userId = existringUser.id;
            return {
                code: 200,
                success: true,
                message: "Login in successfly",
                user: existringUser,
            };
        }
        catch (error) {
            console.log(error);
            return {
                code: 500,
                success: false,
                message: `Internal server error ${error.message}`,
            };
        }
    }
    logout({ req, res }) {
        return new Promise((resolve, _reject) => {
            res.clearCookie(constants_1.COOKIE_NAME);
            req.session.destroy((error) => {
                if (error) {
                    console.log("DESTROYING SESSION ERROR", error);
                    resolve(false);
                }
            });
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)((_return) => UserMutationResponse_1.UserMutationResponse),
    __param(0, (0, type_graphql_1.Arg)("registerInput")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput_1.RegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)((_return) => UserMutationResponse_1.UserMutationResponse),
    __param(0, (0, type_graphql_1.Arg)("loginInput")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput_1.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)((_return) => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map