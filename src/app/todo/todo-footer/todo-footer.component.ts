import { Component, OnInit } from '@angular/core';
import * as fromFiltro from "../../filter/filter.actions";
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { SetFiltroAction } from '../../filter/filter.actions';
import { Todo } from '../models/todo.model';
import { BorrarAllTodoAction } from '../todo.actions';
@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  pendientes: number;
  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFiltro.filtrosValidos;
  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.subscribe(st => {
      this.contarPendientes(st.todos);
      this.filtroActual = st.filtro;
    })
  }
  cambiarFiltro(filtro: fromFiltro.filtrosValidos) {
    this.store.dispatch(new SetFiltroAction(filtro));
  }
  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter(td => !td.completado).length;
  }
  limpiarCompletados() {
    this.store.dispatch(new BorrarAllTodoAction());
  }
}
