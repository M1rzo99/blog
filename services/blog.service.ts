import { IBlog } from "@/types";
import request, { gql } from "graphql-request";
import { title } from "process";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHS_ENDPOINT!;

export const getBlogs = async () => {
  const query = gql`
    query MyQuery {
      blogs {
        ... on Blog {
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
    }
  `;

  const { blogs } = await request<{ blogs: IBlog[] }>(graphqlAPI, query);
  return blogs;
};
export const getBlogDetails = async (slug: string) => {
  const query = gql`
    query MyQuery($slug: String!) {
      blog(where: { slug: $slug }) {
        ... on Blog {
          image {
            url
          }
          author {
            name
            image {
              url
            }
            bio
            id
          }
          content {
            html
          }
          createdAt
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
  `;
  const { blog } = await request<{ blog: IBlog }>(graphqlAPI, query, { slug });
  return blog;
};


export const getSearchBlogs = async(title:string)=>{
  const query = gql`
    query MyQuery($title:String!) {
    blogs(where:{title_contains:$title}){
      title
      image{
     		 url
      }
      slug
      createdAt
    }

    }
  `
  const {blogs} = await request <{blogs:IBlog[]}>(graphqlAPI,query,{title})
  return blogs
}