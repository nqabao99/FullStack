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
const checkAuth_1 = require("../middleware/checkAuth");
const type_graphql_1 = require("type-graphql");
const Post_1 = require("../entities/Post");
const CreatePostInput_1 = require("../types/CreatePostInput");
const PostMutationResponse_1 = require("../types/PostMutationResponse");
const UpdatePostInput_1 = require("../types/UpdatePostInput");
const User_1 = require("../entities/User");
const PaginatePosts_1 = require("../types/PaginatePosts");
const typeorm_1 = require("typeorm");
let PostResolver = class PostResolver {
    textSnippet(root) {
        return root.text.slice(0, 50);
    }
    async user(root) {
        return await User_1.User.findOne(root.userId);
    }
    async createPost({ title, text }, { req }) {
        try {
            const newPost = Post_1.Post.create({
                title,
                text,
                userId: req.session.userId,
            });
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
    async posts(limit, cursor) {
        try {
            const totalPostCount = await Post_1.Post.count();
            const realLimit = Math.min(10, limit);
            const findOptions = {
                order: {
                    createdAt: "DESC",
                },
                take: realLimit,
            };
            let lastPost = [];
            if (cursor) {
                findOptions.where = { createdAt: typeorm_1.LessThan(cursor) };
                lastPost = await Post_1.Post.find({ order: { createdAt: "ASC" }, take: 1 });
            }
            const posts = await Post_1.Post.find(findOptions);
            return {
                totalCount: totalPostCount,
                cursor: posts[posts.length - 1].createdAt,
                hasMore: cursor
                    ? posts[posts.length - 1].createdAt.toString() !==
                        lastPost[0].createdAt.toString()
                    : posts.length !== totalPostCount,
                paginatePosts: posts,
            };
        }
        catch (error) {
            return null;
        }
    }
    async post(id) {
        try {
            const post = await Post_1.Post.findOne(id);
            return post;
        }
        catch (error) {
            return undefined;
        }
    }
    async updatePost({ id, title, text }, { req }) {
        const existingPost = await Post_1.Post.findOne(id);
        if (!existingPost)
            return {
                code: 400,
                success: false,
                message: " Post not found",
            };
        if (existingPost.userId !== req.session.userId) {
            return {
                code: 400,
                success: false,
                message: "Unanthorised",
            };
        }
        existingPost.title = title;
        existingPost.text = text;
        await existingPost.save();
        return {
            code: 200,
            success: true,
            message: "Post updated successfully",
            post: existingPost,
        };
    }
    async deletePost(id, { req }) {
        const existingPost = await Post_1.Post.findOne(id);
        if (!existingPost)
            return {
                code: 400,
                success: false,
                message: " Post not found",
            };
        if (existingPost.userId !== req.session.userId) {
            return {
                code: 400,
                success: false,
                message: "Unanthorised",
            };
        }
        await Post_1.Post.delete({ id });
        return {
            code: 200,
            success: true,
            message: " Post delete successfully",
        };
    }
};
__decorate([
    type_graphql_1.FieldResolver((_return) => String),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_1.Post]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "textSnippet", null);
__decorate([
    type_graphql_1.FieldResolver((_return) => User_1.User),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_1.Post]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "user", null);
__decorate([
    type_graphql_1.Mutation((_return) => PostMutationResponse_1.PostMutationResponse),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Arg("createPostInput")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreatePostInput_1.CreatePostInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    type_graphql_1.Query((_return) => PaginatePosts_1.PaginatePosts, { nullable: true }),
    __param(0, type_graphql_1.Arg("limit", (_type) => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("cursor", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    type_graphql_1.Query((_return) => Post_1.Post, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", (_type) => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    type_graphql_1.Mutation((_return) => PostMutationResponse_1.PostMutationResponse),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Arg("updatePostInput")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdatePostInput_1.UpdatePostInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    type_graphql_1.Mutation((_return) => PostMutationResponse_1.PostMutationResponse),
    type_graphql_1.UseMiddleware(checkAuth_1.checkAuth),
    __param(0, type_graphql_1.Arg("id", (_type) => type_graphql_1.ID)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    type_graphql_1.Resolver((_of) => Post_1.Post)
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=post.js.map