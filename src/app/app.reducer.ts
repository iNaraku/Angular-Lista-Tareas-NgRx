import { ActionReducerMap } from '@ngrx/store';
import { Todo } from './todos/Models/todo.model';
import { todoReducer } from './todos/todos.reducer';
import { filtrosValidos } from './filter/filter.actions';
import { filterReducer } from './filter/filter.reducer';

export interface AppState {
    todos: Todo[];
    filter: filtrosValidos
}

export const appReducer: ActionReducerMap<AppState> = {

    todos: todoReducer,
    filter: filterReducer
}
