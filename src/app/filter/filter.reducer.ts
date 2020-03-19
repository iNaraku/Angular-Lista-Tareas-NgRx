import { createReducer, on } from '@ngrx/store';
import { setFilter, filtrosValidos } from './filter.actions';

export const initialState: filtrosValidos = 'todos';

// tslint:disable-next-line: variable-name
const _filterReducer = createReducer(initialState,
  on(setFilter, (state, { filtro }) => filtro),
);

export function filterReducer(state, action) {
  return _filterReducer(state, action);
}
