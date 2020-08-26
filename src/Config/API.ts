export const BASE_URL: string = process.env.NODE_ENV === 'development' ? "http://localhost:8000" : "http://localhost:8000"

export const LOGIN_URL: string = BASE_URL + '/login'

export const USER_URL: string = BASE_URL + '/user'

