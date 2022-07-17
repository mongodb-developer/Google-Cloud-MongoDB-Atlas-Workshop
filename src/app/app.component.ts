import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Cake } from '../cake';

const GET_ALL_CAKES = gql`
  query GetAllCakes {
    cakes {
      _id
      name
      shortDescription
      image
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cakes$: Observable<Cake[]>;
  cakesLoading = true;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.cakes$ = this.apollo
      .watchQuery({query: GET_ALL_CAKES})
      .valueChanges.pipe(
        tap((result: any) => { this.cakesLoading = result?.loading }),
        map((result: any) => result?.data?.cakes)
      );
  }
}
