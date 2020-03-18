import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../Models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('inputFiscio') txtInputFisico: ElementRef;

  checkCompletado: FormControl;
  txtInput: FormControl;

  editando: boolean = false;

  constructor( private store: Store<AppState> ) { }

  ngOnInit(): void {

    this.checkCompletado = new FormControl( this.todo.completado );
    this.txtInput = new FormControl( this.todo.texto, Validators.required );

    this.checkCompletado.valueChanges.subscribe(valor => {
      this.store.dispatch( actions.toggle({ id: this.todo.id }) );
    });

  }

  editar() {
    this.editando = true;

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  /**
   * Modifica el valor del texto del item seleccionado
   */
  terminarEdicion() {
    this.editando = false;
    this.txtInput.setValue(this.todo.texto);

    if (this.txtInput.invalid) { return; }
    if (this.txtInput.value === this.todo.texto) { return; }

    this.store.dispatch(
      actions.editar({
        id: this.todo.id,
        texto: this.txtInput.value
      })
    );
  }

  /**
   * Elimina un elemento de la lista de tareas
   */
  borrar() {
    this.store.dispatch(actions.borrar({ id: this.todo.id }));
  }

}
