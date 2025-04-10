export interface ChildProps{
    children: React.ReactNode;
}
export interface IBlog{
    title: string;
    description: string;
    date: string;
    author:string,
    image: string;
    tags:string[]
}

export interface IAuthor{
    name: string;
    image:string;
}