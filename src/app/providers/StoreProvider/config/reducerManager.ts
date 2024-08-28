import {
    AnyAction, combineReducers, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema';

// Argument of type 'StateSchema' is not assignable to parameter of type '{ user: UserSchema; loginForm?: undefined; profile?: undefined; } | Partial<{ user: UserSchema | undefined; loginForm?: undefined; profile?: undefined; }> | undefined'.
//   Type 'StateSchema' is not assignable to type 'Partial<{ user: UserSchema | undefined; loginForm?: undefined; profile?: undefined; }>'.
//     Types of property 'loginForm' are incompatible.
//       Type 'LoginSchema | undefined' is not assignable to type 'undefined'.
//         Type 'LoginSchema' is not assignable to type 'undefined'.

export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
    const reducers = { ...initialReducers };

    let combinedReducer = combineReducers(reducers);

    let keysToRemove: Array<StateSchemaKey> = [];

    return {
        getReducerMap: () => reducers,
        reduce: (state: StateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state };
                keysToRemove.forEach((key) => {
                    delete state[key];
                });
                keysToRemove = [];
            }
            return combinedReducer(state, action);
        },
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;

            combinedReducer = combineReducers(reducers);
        },
        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];
            keysToRemove.push(key);
            combinedReducer = combineReducers(reducers);
        },
    };
}
