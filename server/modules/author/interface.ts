export interface IAuthor {
    id: number,
    name: string
}

export function createAuthor({id, name}: any) :IAuthor {
    return {
        id, name
    }
}

export function createAuthors(data: any[]): IAuthor[] {
    return data.map(createAuthor)
}