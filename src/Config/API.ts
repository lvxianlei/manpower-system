export const BASE_URL: string = process.env.NODE_ENV === 'development' ? "http://localhost:8000" : "http://localhost:8000"

export const LOGIN_URL: string = BASE_URL + '/login'

export const MENU_URL: string = BASE_URL + '/menu'

export const LIST_URL: string = '/list'

export const EDIT_URL: string = '/edit'

export const AUTH_URL: string = '/auth'

export const UPLOAD_URL: string = BASE_URL + '/list/upload'



