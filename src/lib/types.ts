export interface Book {
    id: string
    title: string
    author: string
    coverImage: string
}

export interface Comment {
    id: number
    author: string
    content: string
    createdAt: string
}
  
export interface OneBook extends Book{
    summary: string
    comments: Array<Comment>
}
  
export interface BookApi {
    couverture:Array<
        {
            id: number,
            formats: {
            thumbnail: {
                url: string,
            },
            }
        }>,
    auteur: string,
    created_at:string,
    id: number
    documentId: string
    isbn: string
    published_at: string
    titre: string
    updated_at: string
}

export interface CommentApi {
    id: number;
    auteur: string;
    contenu: string;
    createdAt: string;
}

export interface OneBookApi extends BookApi {
    description: string
    commentaires: Array<CommentApi>
}
  