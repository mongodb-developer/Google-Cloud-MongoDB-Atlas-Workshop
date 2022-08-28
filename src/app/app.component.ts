import { Component, OnInit } from '@angular/core';
import { EnvironmentValidatorService } from './environment-validator.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container-md" *ngIf="environmentValid; else invalidEnv">
        <router-outlet></router-outlet>
    </div>

    <ng-template #invalidEnv>
      <h1 class="text-center">First, set up the environment in "src/environments/environment.ts"</h1> 

    </ng-template>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  environmentValid = false;

  constructor(private envValidator: EnvironmentValidatorService) {}

  ngOnInit() {
    this.environmentValid = this.envValidator.isEnvironmentValid();
  }
}
