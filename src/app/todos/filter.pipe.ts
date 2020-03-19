import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './Models/todo.model';
import { filtrosValidos } from '../filter/filter.actions';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filtro: filtrosValidos): unknown {

    switch (filtro) {

      case 'completados':
        return todos.filter(todo => todo.completado);

        case 'pendientes':
        return todos.filter(todo => !todo.completado);

        default:
          return todos;
    }

  }

}
