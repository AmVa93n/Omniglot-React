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
    lang_teach: string[]
    lang_learn: string[]
    reviews?: number
    ratingAvg?: number
}