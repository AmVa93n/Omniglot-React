export interface Notification {
    _id: string
    read: boolean
    source: User
    type: string
    timeDiff: number
}

export interface User {
    _id: string
    username: string
    profilePic: string
    professional: boolean
    birthdate: string
    country: string
    gender: string
    lang_teach: string[]
    lang_learn: string[]
    ratingAvg?: number
    decks: Deck[]
    offers: Offer[]
    reviews: Review[]
    reviewsNr: number
}

export interface Deck {
    topic: string
    language: string
    level: string
    cards: Card[]
}

export interface Card {

}

export interface Offer {
    name: string
    locationType: string
    classType: string
    maxGroupSize: number
    duration: number
    price: number
    language: string
    level: string
}

export interface Review {
    name: string
    locationType: string
    classType: string
    maxGroupSize: number
    duration: number
    language: string
    level: string
    date: string
    author: User
    text: string
    rating: number
}