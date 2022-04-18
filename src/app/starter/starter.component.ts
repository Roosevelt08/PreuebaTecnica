import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import {  EmpleadoModel } from '../models/Empleado.model';
import { NgForm } from '@angular/forms';

import {  EmpleadoService } from '../services/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


@Component({
  templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {

  g_indicador: string;
 
  lst_empleado: EmpleadoModel[] =  [];
  empleado: EmpleadoModel = new EmpleadoModel();

  closeResult: string;
  title_Modal: string;
  modal: NgbModalRef;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(private modalService: NgbModal, private modalService2: NgbModal,
   private empleadoService: EmpleadoService,
 
    private toastr: ToastrService) {
  }

  guardarEmpleado(formulario: NgForm) {
    if (formulario.invalid) {
      console.log('formulaio invalido');
      this.toastr.error('Revise los datos del formulario', 'Aviso');
      return;
    }
   //  this.cliente.tipoClienteId= parseInt(this.cliente.tipoClienteId.toString());
     if (this.g_indicador == 'I'){
      this.empleadoService.createEmpleado(this.empleado).subscribe(respC => {
        this.toastr.success('Se guardo el registro', 'Aviso');
        this.modal.close();
        this.empleadoService.getTodosEmpleados().subscribe(
          resp => {
            this.lst_empleado = resp;
            this.dtTrigger.next();
          });
       });
     } else if (this.g_indicador == 'M'){
      this.empleadoService.updateEmpleado(this.empleado.id,this.empleado).subscribe(respC => {
        this.toastr.success('Se actualizo el registro', 'Aviso');
        this.modal.close();
        this.empleadoService.getTodosEmpleados().subscribe(
          resp => {
            this.lst_empleado = resp;
            this.dtTrigger.next();
          });
       });
     }
  }

  agregarEmpleado(content) {
    this.g_indicador = 'I';
    this.empleado = new EmpleadoModel();
    this.title_Modal = 'Agregar Cliente';
    this.openModal(content);
  }
  modificarEmpleado(id: number, content){
    this.g_indicador = 'M';
    this.title_Modal = 'Modificar Cliente';
    this.empleadoService.getEmpleadoId(id).subscribe(
      (resp: EmpleadoModel) => {
        this.empleado = resp;
        this.openModal(content);
      });
  }
  eliminarEmpleado(id: number) {
    if (confirm('¿Desea eliminar este registro?')) {
      this.empleadoService.deleteEmpleado(id).subscribe(
        (respdel: any) => {
          this.toastr.success('Se elimino el registro', 'Aviso');
           this.empleadoService.getTodosEmpleados().subscribe(
            resp => {
              this.lst_empleado = resp;
              this.dtTrigger.next();
            });
        });
    }
  }
  openModal(content) {
    this.modal = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openModalConfirm(content) {
    this.modalService2.open(content, { size: 'sm' });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngAfterViewInit() {
        this.empleadoService.getTodosEmpleados().subscribe(
      resp => {      
        this.lst_empleado = resp;
        this.dtTrigger.next();
      });
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 7,
        deferRender: true,
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
        retrieve: true
      };

  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
