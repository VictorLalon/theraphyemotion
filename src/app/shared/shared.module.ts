import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { LoginInputComponent } from './components/login-input/login-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HistoriaclinicaComponent } from './components/historiaclinica/historiaclinica.component';
import { UpdateHistoriaclinicaComponent } from './components/update-historiaclinica/update-historiaclinica.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LoginInputComponent,
    LogoComponent,
    UpdateEmployeeComponent,
    HistoriaclinicaComponent,
    UpdateHistoriaclinicaComponent
  ],
  exports: [
    HeaderComponent,
    LoginInputComponent,
    LogoComponent,
    UpdateEmployeeComponent,
    FormsModule,
    ReactiveFormsModule,
    HistoriaclinicaComponent,
    UpdateHistoriaclinicaComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class SharedModule { }
