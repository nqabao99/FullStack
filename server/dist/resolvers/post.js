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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Post_1 = require("../entities/Post");
const checkAuth_1 = require("../middleware/checkAuth");
const CreatePostInput_1 = require("../types/CreatePostInput");
const PostMutationResponse_1 = require("../types/PostMutationResponse");
const UpdatePostInput_1 = require("../types/UpdatePostInput");
let PostResolver = class PostResolver {
    async createPost({ title, text }) {
        try {
            const newPost = Post_1.Post.create({ title, text });
            await newPost.save();
            return {
                code: 200,
                success: true,
                message: "Post created successfully",
                post: newPost,
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
    async posts() {
        try {
            return await Post_1.Post.find();
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async post(id) {
        try {
            const post = await Post_1.Post.findOne(id);
            return post;
        }
        catch (error) {
            console.log(error);
            return undefined;
        }
    }
    async updatePost({ id, title, text }) {
        const existingPost = await Post_1.Post.findOne(id);
        if (!existingPost)
            return {
                code: 400,
                success: false,
                message: "Post not found",
            };
        existingPost.title = title;
        existingPost.text = text;
        await existingPost.save();
        return {
            code: 200,
            success: true,
            message: "Post update successfully",
            post: existingPost,
        };
    }
    async deletePost(id) {
        const existingPost = await Post_1.Post.findOne(id);
        if (!existingPost)
            return {
                code: 400,
                success: false,
                message: "Post not found",
            };
        await Post_1.Post.delete({ id });
        return {
            code: 200,
            success: true,
            message: "Post deleted successfully",
        };
    }
};
__decorate([
    (0, type_graphql_1.Mutation)((_return) => PostMutationResponse_1.PostMutationResponse),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)("createPostInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePostInput_1.CreatePostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Query)((_return) => [Post_1.Post], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    (0, type_graphql_1.Query)((_return) => Post_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", (_type) => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    (0, type_graphql_1.Mutation)((_return) => PostMutationResponse_1.PostMutationResponse),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)("updatePostInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdatePostInput_1.UpdatePostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    (0, type_graphql_1.Mutation)((_return) => PostMutationResponse_1.PostMutationResponse),
    (0, type_graphql_1.UseMiddleware)(checkAuth_1.checkAuth),
    __param(0, (0, type_graphql_1.Arg)("id", (_type) => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.js.map