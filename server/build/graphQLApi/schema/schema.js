"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

var typeDefinitionsTemplate = function typeDefinitionsTemplate(types, queries, mutations, subscriptions) {
   return "\n" + types + "\n" + (queries ? "type Query {\n   " + queries + "\n}" : "") + "\n" + (mutations ? "type Mutation {\n   " + mutations + "\n}" : "") + "\n" + (subscriptions ? "type Subscription {\n   " + subscriptions + "\n}" : "") + "\nschema {\n   " + (queries ? "query: Query" : "") + "\n   " + (mutations ? "mutation: Mutation" : "") + "\n   " + (subscriptions ? "subscription: Subscription" : "") + "\n}\n";
};

var schema = [""];

exports.typeDefinitionsTemplate = typeDefinitionsTemplate;
exports.schema = schema;