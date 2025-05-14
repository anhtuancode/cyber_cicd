import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Article {
      id: ID
      title: String
      content: String
      imageUrl: String
      views: Int
      userId: Int
      deletedBy: Int
      isDeleted: Int
      deletedAt: String
      createdAt: String
      updatedAt: String
    }

    type Pagination{
      page: Int
      pageSize: Int
      totalItem: Int
      totalPage: Int
      items: [Article]
    }

    type Query {
      hello: String
      getArticleList(page: Int, pageSize: Int): Pagination
    }

    type Mutation{
      createArticle(title: String, content: String, imageUrl: String): Article

    }
`);

export default schema;
