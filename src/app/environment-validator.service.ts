import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentValidatorService {
  constructor() { }

  isEnvironmentValid() {
    const { APP_ID, GRAPHQL_URI, API_KEY } = environment;

    return !!APP_ID && !!GRAPHQL_URI && !!API_KEY;
  }
}
