import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll, limpiarTodos } from './todo.actions';
import { Todo } from './Models/todo.model';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Robar escudo del capitán Ámerica'),
];

// tslint:disable-next-line: variable-name
const _todoReducer = createReducer(estadoInicial,

  /**
   * Regresa un nuevo arreglo en el cual se quitan las tareas con estado completado en falso
   */
  on(limpiarTodos, state => state.filter(todo => !todo.completado)),

  /**
   * Regresa un nuevo arreglo en el cual agrega el nuevo elemento
   */
  on(crear, (state, { texto }) => [...state, new Todo( texto )]),

  /**
   * Regresa un nuevo arreglo en el que cambia el estado de completado del item seleccionado
   */
  on(toggle, (state, { id }) => state.map( todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        };
      } else {
        return todo;
      }
    })),

  /**
   * Regresa un nuevo arreglo excluyendo el item con el id espcificado
   */
  on(editar, (state, { id, texto }) => state.map( todo => {
    if (todo.id === id) {
      return {
        ...todo,
        texto
      };
    } else {
      return todo;
    }
  })),

  /**
   * Regresa un nuevo arreglo excluyendo el item con el id espcificado
   */
  on(borrar, (state, { id }) => state.filter(todo => todo.id !== id)),

  /**
   * Regresa un nuevo arreglo cambiando el estado de completado de todos los items
   */
  on(toggleAll, (state, { completado }) => state.map(todo => {
      return {
        ...todo,
        completado
      };
    }))

);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
