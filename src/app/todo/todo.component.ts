import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducers';
import { ToggleAllTodoAction } from './todo.actions';

@Component({ selector: 'app-todo', templateUrl: './todo.component.html' })
export class TodoComponent implements OnInit {

  completado = false;
  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
  }
  toggleAll() {
    this.completado = !this.completado;
    this.store.dispatch(new ToggleAllTodoAction(this.completado));
  }

}
