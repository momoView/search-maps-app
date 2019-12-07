import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as authActions from '../../auth/store/auth.actions';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as fromSM from '../../search-maps/store/search-maps.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  authState$: Observable<fromAuth.State>

  constructor(private store: Store<fromSM.FeatureState>,
    private router: Router) {}

  ngOnInit() {
    this.authState$=this.store.select('auth');
  }

  onLogout(){
    this.store.dispatch(new authActions.DoLogout());
    this.router.navigate(['signin']);
  }
}
