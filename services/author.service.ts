import { IAuthor } from "@/types";
import request, { gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHS_ENDPOINT!

export const getAuthors = async ()=>{
    const query  = gql`
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

    `
    const { authors } = await request<{ authors: IAuthor[] }>(graphqlAPI, query);
  return authors
}
