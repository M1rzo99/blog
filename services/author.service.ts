import { IAuthor, IBlog } from "@/types";
import request, { gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHS_ENDPOINT!;

export const getAuthors = async () => {
  const query = gql`
    query MyQuery {
      authors {
        name
        id
        bio
        image {
          url
        }
        blogs {
          ... on Blog {
            id
          }
        }
      }
    }
  `;
  const { authors } = await request<{ authors: IAuthor[] }>(graphqlAPI, query);
  return authors;
};

export const getDetailedAuthor = async (id: string) => {
  const query = gql`
    query MyQuery($id:ID) {
      author(where: { id: $id }) {
        bio
        name
        image {
          url
        }
        blogs {
          ... on Blog {
            description
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
      }
    }
  `;

  const { author } = await request<{
    author: IAuthor
  }>(graphqlAPI, query, { id });
  return author
};
