import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'Имя и Фамилия обязательны',
    INCORRECT_AGE = 'Неккоректный возраст',
    INCORRECT_COUNTRY = 'Неккоректный регион',
    NO_DATA = 'Данные не указаны',
    SERVER_ERROR = 'Серверная ошибка'
}

export interface Profile {
    id?: string
    first?: string,
    lastName?: string,
    age?: number,
    currency?: Currency,
    country?: Country,
    city?: string,
    username?: string,
    avatar?: string,
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileError[];
}