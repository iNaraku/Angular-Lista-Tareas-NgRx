import { Component, OnInit } from '@angular/core';
import { Todo } from '../Models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filtrosValidos } from '../../filter/filter.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  filtroActual: filtrosValidos;

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.store.subscribe(({ todos, filter }) => {
      this.todos = todos;
      this.filtroActual = filter;
    });

  }

}
