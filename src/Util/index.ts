export const setItem = (data: any) => {
    for (let key in data) {
        localStorage.setItem(key, data[key]);
    }
}

export const getItem = (key: string, format?: Function) => {
    let value: string | null = localStorage.getItem(key)
    value = (format && format instanceof Function && format(value)) || value
    return value;
}

export const setSessionItem = (data: any) => {
    for (let key in data) {
        sessionStorage.setItem(key, data[key]);
    }
}

export const getSessionItem = (key: string, format?: Function) => {
    let value: string | null = sessionStorage.getItem(key)
    value = (format && format instanceof Function && format(value)) || value
    return value;
}

export const removeItem = (key: string) => localStorage.removeItem(key);

export { default as ErrorInfo } from './ErrorInfo'
export { default as CodeInfo } from './CodeInfo'

export { default as request } from './request'