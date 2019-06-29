export class Document<T> {
    constructor(public entries: T) {}
}

export type Review = {
    review: string
    uid: string
    date: Date
}

export type PrivateUser = {
    reviews: Review[]
    uuid: string
    username: string
    password: string
}

export type PublicUser = {
    reviews: Review[]
    uuid: string
}

export type LoginPacket = {
    username: string,
    password: string
}