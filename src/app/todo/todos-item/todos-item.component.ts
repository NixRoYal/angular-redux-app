import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { ToggleTodoAction, EditarTodoAccion, BorrarAllTodoAction, BorrarTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todos-item',
  templateUrl: './todos-item.component.html'
})
export class TodosItemComponent implements OnInit {
  @Input() todo: Todo;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;
  chkField: FormControl;
  txtInput: FormControl;
  editando: boolean;
  constructor(private store: Store<AppState>) { }
  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkField.valueChanges.subscribe(() => this.store.dispatch(new ToggleTodoAction(this.todo.id)));
  }

  editar() {
    this.editando = true;
    setTimeout(() => this.txtInputFisico.nativeElement.select(), 1);
  }

  terminarEdicion() {
    this.editando = false;
    if (this.txtInput.invalid) return;
    this.store.dispatch(new EditarTodoAccion(this.todo.id, this.txtInput.value));
  }

  borrarTodo() {
    this.store.dispatch(new BorrarTodoAction(this.todo.id));
  }

}
