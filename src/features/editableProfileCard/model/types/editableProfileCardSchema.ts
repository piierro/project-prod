import { Profile } from 'entities/Profile/model/types/profile';


export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'Имя и Фамилия обязательны',
    INCORRECT_AGE = 'Неккоректный возраст',
    INCORRECT_COUNTRY = 'Неккоректный регион',
    NO_DATA = 'Данные не указаны',
    SERVER_ERROR = 'Серверная ошибка'
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileError[];
}