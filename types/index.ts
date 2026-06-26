export interface ChildProps {
  children: React.ReactNode;
}

export interface IArchiveBlogs{
  year:string;
  blogs:IBlog[]
}

export interface IBlog {
  title: string;
  description: string;
  author: IAuthor;
  category: ICategoryAndTags;
  tag: ICategoryAndTags;
  image: { url: string } | null;
  createdAt: string;
  content: { html: string };
  slug: string;
}

export interface IAuthor {
  name: string;
  image: { url: string } | null; // ✅ null bo'lishi mumkin, string emas
  bio: string;
  blogs: IBlog[];
  id: string;
}

export interface ICategoryAndTags {
  name: string;
  slug: string;
  blogs: IBlog[];
}
