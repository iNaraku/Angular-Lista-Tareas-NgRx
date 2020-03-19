import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../../filter/filter.actions';
import { filtrosValidos } from '../../filter/filter.actions';
import { limpiarTodos } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: actions.filtrosValidos = 'todos';
  filtros: filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  pendientes: number = 0;

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.store.subscribe(state => {
      this.filtroActual = state.filter;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    });

  }

  cambiarFiltro( filtro: filtrosValidos ) {
    console.log(filtro);

    this.store.dispatch(actions.setFilter({ filtro }));
  }

  limpiarCompletados() {
    this.store.dispatch(limpiarTodos());
  }

}
