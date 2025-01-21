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
    password: string
    profilePic: string
    professional: boolean
    private: boolean
    birthdate: string
    country: string
    gender: string
    lang_teach: string[]
    lang_learn: string[]
    stripeAccountId: string
    ratingAvg?: number
    decks?: Deck[]
    offers?: Offer[]
    reviews?: Review[]
    reviewsNr?: number
}

export interface Deck {
    _id: string
    topic: string
    language: string
    level: string
    cards: Flashcard[]
    creator: string
}

export interface Flashcard {
    _id: string
    front: string
    back: string
    priority: number
    deck: string
}

export interface Offer {
    _id: string
    creator: User
    name: string
    locationType: string
    location: string
    classType: string
    maxGroupSize: number
    duration: number
    price: number
    language: string
    level: string
    weekdays: string[]
    timeslots: string[]
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
    reschedule: {
        status: string
        new_date: string
        new_timeslot: string
        initiator: User | string
    }
    isRated: boolean
    isPast: boolean
    endTime: string
}

export interface Review {
    _id: string
    name: string
    date: string
    author: User
    text: string
    rating: number
    class: Class
}

export interface Chat {
    _id: string
    participants: User[]
    messages: Message[]
}

export interface Message {
    _id: string
    sender: string
    recipient: string
    message: string
    timestamp: string
    chat: string
}

export interface country {
    name: {
        common: string
    }
}

export interface Transaction {
    _id: string
    date: string
    time: string
    amount: number
    offer: Offer
    student: User
    class: string
}

export interface calendarEvent {
    title: string
    id: string
    student: string
    start: Date
    end: Date
}

export interface topLanguages {
    teach: {
        code: string
        amount: number
    }[]
    learn: {
        code: string
        amount: number
    }[]
}

export interface searchFilters {
    username: string, 
    minAge: string,
    maxAge: string,
    country: string, 
    gender: string, 
    lang_teach: string[],
    lang_learn: string[],
}