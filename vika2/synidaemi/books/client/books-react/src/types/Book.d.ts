interface BookEntity {
    _id: string;
    title: string;
    description: string;
    pageCount: Number;
    author: string;
    image: string;
}

interface BookDto {
    _id: string;
    title: string;
    description: string;
    pageCount: Number;
    author: AuthorEntity;
    image: string;
}
