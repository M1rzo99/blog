import { IBlog } from "@/types";
import request, { gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHS_ENDPOINT!

export const getBlogs = async () => {
  const query = gql`
    query MyQuery {
      blogs {
        title
        createdAt
        description
        author {
          name
          image {
            url
          }
        }
        category {
          name
          slug
        }
        tag {
          name
          slug
        }
        image {
          url
        }
        content {
          html
        }
        slug
      }
    }
  `;

  const { blogs } = await request<{ blogs: IBlog[] }>(graphqlAPI, query);
  return blogs;
};
export const getBlogDetails = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      blog(where: { slug: $slug }) {
        author {
          name
          image {
            url
          }
            bio
        }
        content {
          html
        }
        createdAt
        image {
          url
        }
        slug
        tag {
          name
          slug
        }
           category {
          name
          slug
        }
        title
      }
    }
  `
  const { blog } = await request<{ blog: IBlog }>(graphqlAPI, query, { slug });
  return blog;
}
