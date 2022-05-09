import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import {MatDialog} from '@angular/material/dialog';
import { CreateEditUsersComponent } from '../modals/create-edit-users/create-edit-users.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-component',
  templateUrl: './users-component.component.html',
  styleUrls: ['./users-component.component.css']
})
export class UsersComponentComponent implements OnInit {

  public displayedColumns: string[] = ['position', 'name', 'username', 'document', 'mail','actions'];
  public dataSource = [];
  public itemsPerPage = 5;
  public page = 0;
  public total = 0;
  public loading = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public form: FormGroup;

  constructor(private usersService:UsersService, 
    private toastrService:ToastrService, 
    private dialog: MatDialog,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.getUsers();
  }

  buildForm(){
    this.form = this.fb.group({
      search: ['',[Validators.min(100000),Validators.max(999999999999999),Validators.pattern('[0-9]+')]],
    });
  }

  getUsers(){
    if(this.form.valid){
      this.loading = true;
      let data = {
        token: localStorage.getItem('token'),
        itemsPerPage: this.itemsPerPage,
        search: this.form.value.search
      }
      this.usersService.getUsers(data,this.page).subscribe(
        (response:any)=>{
          this.loading = false;
          if(response.status == 200){
            this.dataSource = response.data.data;
            this.total = response.data.total;
            if(this.total == 0){
              this.toastrService.warning('No se encontraron usuarios.','Advertencia');
            }
          }else{
            this.toastrService.error('No fue posible obtenerse los usuarios.','Error');
          }
        }, () => {
          this.loading = false;
          this.toastrService.error('Ocurrió un error al obtenerse los usuarios.','Error');
        }
      );
    }
  }

  changePage(event:any){
    this.page = event.pageIndex+1;
    this.itemsPerPage = event.pageSize;
    this.getUsers();
  }

  createUser(){
    const dialogRef = this.dialog.open(CreateEditUsersComponent, {
        data: {
            title: 'Crear',
            editing: false
        },
        width: '500px',
        disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.getUsers();
      }
    });
  }

  editUser(user:any){
    const dialogRef = this.dialog.open(CreateEditUsersComponent, {
        data: {
            title: 'Editar',
            editing: true,
            user:user
        },
        width: '500px',
        disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'ok') {
        this.getUsers();
      }
    });
  }

  deleteUser(id:any){
    let data = {
      id,
      token: localStorage.getItem('token')
    }
    this.usersService.deleteUser(data).subscribe(
      (response:any) => {
        if(response.status == 200){
          this.toastrService.success('Se ha eliminado exitosamente el usuario','Exito');
          this.getUsers();
        }else{
          this.toastrService.error('No fue posible eliminarse el usuario','Error');
        }
      },() => {
        this.toastrService.error('Ocurrió un error al eliminarse el usuario','Error');
      }
    );
  }
}
