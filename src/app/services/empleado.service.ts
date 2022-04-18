import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  EmpleadoModel } from '../models/Empleado.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

   private url_app = 'http://localhost:9191/api/empleado';
  constructor(private http: HttpClient) {  
   }
  getQuery(url: string) {
    const urlBase = `${this.url_app}${url}`;    
    return this.http.get(urlBase);
  }

  postQuery(url: string, cliente: EmpleadoModel) {
    const urlBase = `${this.url_app}${url}`;
    return this.http.post(urlBase,cliente) ;
  }
  updateQuery(url: string, cliente: EmpleadoModel) {
    const urlBase = `${this.url_app}${url}`;   
    return this.http.put(urlBase, cliente);
  }
  deleteQuery(url: string) {
    const urlBase = `${this.url_app}${url}`;  
    return this.http.delete(urlBase);
  }
  createEmpleado(cliente: EmpleadoModel) {
    return this.postQuery('/insert', cliente).pipe(
      map(resp => {
        return resp;
      })
    );
  }
  getTodosEmpleados() {
    return this.getQuery('/findAll')
    .pipe(
      map(this.crearArreglo)
    );
  }


  getEmpleadoId(id: number) {
    return this.getQuery(`/findById/${id}`)
    .pipe(
      map(resp => {
        return resp;
      })
    );
  }
  updateEmpleado(id: number, cliente: EmpleadoModel) {
    return this.updateQuery(`/update/${id}`, cliente).pipe(
      map(resp =>{
        return resp;
      })
    );
  }
  deleteEmpleado(id: number) {
    return this.deleteQuery(`/delete/${id}`)
    .pipe(
      map(resp => {
        return resp;
      })
    );
  }
  crearArreglo(clientesObj: object){
    const clientes: EmpleadoModel[] = [];
    Object.keys(clientesObj).forEach(key => {
      const cliente: EmpleadoModel = clientesObj[key];
      clientes.push(cliente);
    });
    return clientes;
  }

}
