import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Employees } from 'src/app/models/employees.model';
import { Historiaclinica } from 'src/app/models/historiaclinica.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-update-historiaclinica',
  templateUrl: './update-historiaclinica.component.html',
  styleUrls: ['./update-historiaclinica.component.scss'],
})
export class UpdateHistoriaclinicaComponent implements OnInit {

  constructor(private fb: FormBuilder){

    this.form3 = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      fechadenacimiento: new FormControl('', [Validators.required]),
      cedula: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      cargo: new FormControl('', [Validators.required]),
      plantel: new FormControl('', [Validators.required]),
      salario: new FormControl(null, [Validators.required, Validators.min(0)]),
      historia: this.fb.array([]) // Aquí inicializamos el FormArray
    });


  }

  @Input() employee: Employees;

  
  loading: boolean = false;
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  user = {} as User;
  form3 : FormGroup;


  form = new FormGroup({


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

  form2 = new FormGroup({
    id: new FormControl(''),
    evaluacion: new FormControl('', [Validators.required]),
    terapia: new FormControl('', [Validators.required]),
    /*     objetivos: new FormControl('', [Validators.required]),
        fechadetratamiento: new FormControl('', [Validators.required]),
        tiempotratamiento: new FormControl(null, [Validators.required, Validators.maxLength(10)]),
        pronostico: new FormControl('', [Validators.required]),
        conclusiones: new FormControl('', [Validators.required]), 
        recomendaciones: new FormControl(null, [Validators.required, Validators.min(0)]),
        firma: new FormControl(null, [Validators.required, Validators.min(0)]),
        estado: new FormControl('', [Validators.required]),  */
  })


  ngOnInit() {
    this.user = this.utilsService.getLocalStorage('user');
    if (this.employee) this.form.setValue(this.employee)

    console.log("Paciente: ", this.employee.historia);
    console.log("Usuario: ", this.user.uid);

  }


  async submit() {
    if (this.form2.valid) {
      if (this.employee) this.updateHistoriaClinica();
    }

  }
  async updateHistoriaClinica() {

    let path = `users/${this.user.uid}/empleados/${this.employee.id}/historia/`;

    const loading = await this.utilsService.loading();
    await loading.present();
    delete this.form2.value.id;

    this.firebaseService.updateDocument(path, this.form2.value)
      .then(async resp => {

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





}
