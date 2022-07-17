export interface Comment {
    _id?: string;
    cakeId?: string | { link: string };
    name: string;
    text: string;
    date: Date;
}
