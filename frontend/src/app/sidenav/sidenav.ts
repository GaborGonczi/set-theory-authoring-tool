import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SIDENAV_IMPORTS } from '@src/app/sidenav/sidenav.imports';
import { filter } from 'rxjs';

type MenuItem = {
  name:string;
  path:string;
}


@Component({
  imports: SIDENAV_IMPORTS,
  selector: 'app-sidenav',
  styleUrl: './sidenav.scss',
  templateUrl: './sidenav.html',
})
export class Sidenav implements OnInit {

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public enabled = signal(this.route.root.firstChild?.snapshot.data['sidenav'] === true);
  public opened : boolean = false;

  public menuItems:MenuItem[] = [];

  constructor() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.enabled.set(this.route.root.firstChild?.snapshot.data['sidenav'] === true);
      });
    
      
  }

  ngOnInit(): void {
    this.menuItems = [
      {
        name:'Főoldal',
        path:'/'
      },
      {
        name:'Kiértékelő',
        path:'/evaluator'
      },
      {
        name:'Fájlok',
        path:'/files'
      },
      {
        name:'Segítség',
        path:'/help'
      },
      {
        name:'Profil',
        path:'/profile'
      }
    ]
  }

  public toggle() {
    this.opened=!this.opened;
  }

}
