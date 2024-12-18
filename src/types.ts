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
    email: string
    profilePic: string
    professional: boolean
    private: boolean
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

export interface Class {
    _id: string
    name: string
    locationType: string
    location: string
    classType: string
    maxGroupSize: number
    duration: number
    language: string
    level: string
    date: string
    timeslot: string
    teacher: User
    student: User
    reschedule: rescheduleRequest
    isRated: boolean
    isPast: boolean
    endTime: string
}

export interface rescheduleRequest {
    status: string
    new_date: string
    new_timeslot: string
    initiator: User | string
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

export interface country {
    name: {
        common: string
    }
}

export interface profileForm {
    username: string
    email: string
    password: string
    profilePic: string
    birthdate: string
    country: string
    gender: string
    lang_teach: string[]
    lang_learn: string[]
    professional: boolean
    private: boolean
}

export interface calendarEvent {
    title: string
    id: string
    start: string
    end: string
    display: string
}