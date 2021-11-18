import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersComponent } from './pages/offers/offers.component';
import { TemplateComponent } from './components/template/template.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    OffersComponent,
    TemplateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    /**
     * Dashboard module is given as an example module. It provides some routes below.
     * 
     * TemplateComponent is a component that contains common parts of the page layout.
     * OffersComponent is given here as an example.
     * 
     */
    RouterModule.forChild(
      [
        { path: '', component: TemplateComponent, children: [
          { path: '', component: OffersComponent }
        ] }
      ]
    )
  ]
})
export class DashboardModule { }
