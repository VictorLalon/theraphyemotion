import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employees } from 'src/app/models/employees.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss'],
})
export class UpdateEmployeeComponent  implements OnInit {

  @Input() employee: Employees;

  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);

  user = {} as User;


  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    fechadenacimiento: new FormControl('', [Validators.required]),
    cedula: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
    cargo: new FormControl('', [Validators.required]),
    plantel: new FormControl('', [Validators.required]), 
    salario: new FormControl(null, [Validators.required, Validators.min(0)]),
/*     historiaclinica: new FormControl('', [Validators.required]),
    fechaconsulta: new FormControl('', [Validators.required]),  
    motivoconsulta: new FormControl('', [Validators.required]),  
    historialdeenfermedad: new FormControl('', [Validators.required]), 
    antecendentesmedicos: new FormControl('', [Validators.required]), 
    desarollodefisioterapia: new FormControl('', [Validators.required]),
    antecedentes_medicos: new FormControl('', [Validators.required]), 
    habitos: new FormControl('', [Validators.required]), 
    evaluacionterapuetica: new FormControl('', [Validators.required]), 
    pruebasfisicas: new FormControl('', [Validators.required]), 
    diagnosticofisioterapeutico: new FormControl('', [Validators.required]), 
    plandetratamiento: new FormControl('', [Validators.required]),
    resultados: new FormControl('', [Validators.required]),
    consentiemiento: new FormControl('', [Validators.required]),
    firma: new FormControl('', [Validators.required]), */
  })

  ngOnInit() {
    this.user = this.utilsService.getLocalStorage('user');
    if(this.employee) this.form.setValue(this.employee)
  }


  async submit() {
    if(this.form.valid) {
      if(this.employee) this.updateEmployee();
      else this.createEmployee();
    }   

  }
  setNumberInput() {
    let { salario } = this.form.controls;
    if(salario.value) salario.setValue(parseFloat(salario.value));
  }

  async createEmployee() {

    let path = `users/${this.user.uid}/empleados`;

    const loading = await this.utilsService.loading();
    await loading.present();

/*     let dataUrl = this.form.value.img;
    let imgPath = `${this.user.uid}/${Date.now()}`;    
    let imgUrl = await this.firebaseService.updateImg(imgPath, dataUrl);

    this.form.controls.img.setValue(imgUrl); */

    delete this.form.value.id;

    this.firebaseService.addDocument(path, this.form.value)
      .then( async resp => {

        this.utilsService.dismissModal({ success: true });
        
        this.utilsService.presentToast({
          message: `Paciente creado exitósamente`,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'checkmark-circle-outline'
        })

      }).catch(error => {
        console.log(error);
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'bottom',
          icon: 'alert-circle-outline'
        })
      }).finally(() => {
        loading.dismiss();
      })

  }

  async updateEmployee() {
    
    let path = `users/${this.user.uid}/empleados/${this.employee.id}`;

    const loading = await this.utilsService.loading();
    await loading.present();
    delete this.form.value.id;

    this.firebaseService.updateDocument(path, this.form.value)
      .then( async resp => {

        this.utilsService.dismissModal({ success: true });
        
        this.utilsService.presentToast({
          message: `Paciente actualizado exitósamente`,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
          icon: 'checkmark-circle-outline'
        })

      }).catch(error => {
        console.log(error);
        this.utilsService.presentToast({
          message: error.message,
          duration: 2500,
          color: 'danger',
          position: 'bottom',
          icon: 'alert-circle-outline'
        })
      }).finally(() => {
        loading.dismiss();
      })

  }

/*   async takeImage() {
    const dataUrl = (await this.utilsService.takePicture('Imagen del empleado')).dataUrl //Extraer la respuesta
    this.form.controls.img.setValue(dataUrl)
  }
 */
  

}
