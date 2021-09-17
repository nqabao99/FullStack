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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatePosts = void 0;
const Post_1 = require("../entities/Post");
const type_graphql_1 = require("type-graphql");
let PaginatePosts = class PaginatePosts {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], PaginatePosts.prototype, "totalCount", void 0);
__decorate([
    type_graphql_1.Field((_type) => Date),
    __metadata("design:type", Date)
], PaginatePosts.prototype, "cursor", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], PaginatePosts.prototype, "hasMore", void 0);
__decorate([
    type_graphql_1.Field((_type) => [Post_1.Post]),
    __metadata("design:type", Array)
], PaginatePosts.prototype, "paginatePosts", void 0);
PaginatePosts = __decorate([
    type_graphql_1.ObjectType()
], PaginatePosts);
exports.PaginatePosts = PaginatePosts;
//# sourceMappingURL=PaginatePosts.js.map