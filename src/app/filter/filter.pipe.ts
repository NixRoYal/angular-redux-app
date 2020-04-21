import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../todo/models/todo.model';
import * as fromFiltro from "./filter.actions";
@Pipe({ name: 'filterDt' })
export class FilterPipe implements PipeTransform {

  transform(todos: Todo[], filtro: String): Todo[] {
    switch (filtro) {
      case 'completados': return todos.filter(td => td.completado);
      case 'pendientes': return todos.filter(td => !td.completado);
      default: return todos;
    }
  }

}
