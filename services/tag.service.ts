import { IBlog, ICategoryAndTags } from "@/types";
import request, { gql } from "graphql-request";
import { cache } from "react";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHS_ENDPOINT!;

export const getTags = async () => {
  const query = gql`
    query MyQuery {
      tags {
        name
        slug
        blogs{
        id
        }
      }
    }
  `;

  const { tags } = await request<{ tags: ICategoryAndTags[] }>(
    graphqlAPI,
    query,
  );
  return tags;
};

export const getBlogsByTag = cache(async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      tag(where: { slug: $slug }) {
        blogs {
          ... on Blog {
            id
            title
            description
            content {
              html
            }
            createdAt
            slug
            category {
              name
              slug
              createdAt
            }
            tag {
              name
              slug
              createdAt
            }
            image {
              url
            }
            author {
              image {
                url
              }
            }
          }
        }
        name
      }
    }
  `;

  const { tag } = await request<{ tag: { blogs: IBlog[]; name: string } }>(
    graphqlAPI,
    query,
    { slug },
  );
  return tag;
})
