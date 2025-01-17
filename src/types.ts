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
    stripeAccountId: string
    ratingAvg?: number
    decks: Deck[]
    offers: Offer[]
    reviews: Review[]
    reviewsNr: number
}

export interface Deck {
    _id: string
    topic: string
    language: string
    level: string
    cards: Flashcard[]
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
    _id: string
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

export interface transaction {
    id: string
    date: string
    time: string
    amount: number
    currency: string
    offer: Offer
    customer: {
        name: string
    }
}

export interface signupForm {
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

export interface editProfileForm {
    username: string
    email: string
    birthdate: string
    country: string
    gender: string
    lang_teach: string[]
    lang_learn: string[]
    professional: boolean
    private: boolean
}

export interface offerForm {
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

export interface deckForm {
    topic: string
    language: string
    level: string
    cards: Flashcard[]
}

export interface flashcardForm {
    front: string
    back: string
}

export interface reviewForm {
    text: string
    rating: number
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