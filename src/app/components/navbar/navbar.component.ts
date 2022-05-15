import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private loginService: LoginServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  logout(){
    let data = {
      token: localStorage.getItem('token'),
    }
    this.loginService.logout(data);
  }

  goToMyProfile(){
    this.router.navigate(['my-profile']);
  }
}
