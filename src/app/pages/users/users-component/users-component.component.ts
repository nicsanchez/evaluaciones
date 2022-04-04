import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CreateEditUsersComponent } from '../modals/create-edit-users/create-edit-users.component';

@Component({
  selector: 'app-users-component',
  templateUrl: './users-component.component.html',
  styleUrls: ['./users-component.component.css']
})
export class UsersComponentComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'username', 'document', 'mail','actions'];
  dataSource = [];
  itemsPerPage = 5;
  page = 0;
  total = 0;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private usersService:UsersService, 
    private toastrService:ToastrService, 
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    let token = localStorage.getItem('token');
    let data = {
      token,
      itemsPerPage: this.itemsPerPage,
    }

    this.usersService.getUsers(data,this.page).subscribe(
      (response:any)=>{
        if(response.status == 200){
          this.dataSource = response.data.data;
          this.total = response.data.total; 
        }else{
          this.toastrService.error('No fue posible obtenerse los usuarios.','Error');
        }
      }, () => {
        this.toastrService.error('Ocurrió un error al obtenerse los usuarios.','Error');
      }
    );
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
