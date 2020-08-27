export const BASE_URL: string = process.env.NODE_ENV === 'development' ? "http://localhost:8000" : "http://localhost:8000"

export const LOGIN_URL: string = BASE_URL + '/login'

export const LIST_URL: string = BASE_URL + '/list'

export const EDIT_URL: string = BASE_URL + '/edit'

