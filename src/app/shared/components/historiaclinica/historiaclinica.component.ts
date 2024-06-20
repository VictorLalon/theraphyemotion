import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { Employees } from 'src/app/models/employees.model';
import { Historiaclinica } from 'src/app/models/historiaclinica.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-historiaclinica',
  templateUrl: './historiaclinica.component.html',
  styleUrls: ['./historiaclinica.component.scss'],
})
export class HistoriaclinicaComponent implements OnInit {

  @Input() employee: Employees;
  @Input() historia: Historiaclinica;
  loading: boolean = false;
  filterTerm1: string;
  firebaseService = inject(FirebaseService);
  utilsService = inject(UtilsService);
  employees: Employees[] = [];
  historia2:  Historiaclinica []= [];

  user = {} as User;

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
      if (this.historia) this.form2.setValue(this.historia)

        console.log("Paciente: ", this.employee.id);
    console.log("Usuario: ", this.user.uid);
    console.log("Historia: ", this.historia.id);
  }


  async submit() {
    console.log(this.form2.value);
    if(this.form2.valid) {
      if(this.historia) this.updateHistoria();
      else this.crearHistoria();
     
      
    }   

  }
  setNumberInput() {
    let { salario } = this.form.controls;
    if(salario.value) salario.setValue(parseFloat(salario.value));
  }

  async crearHistoria() {

    let path = `users/${this.user.uid}/empleados/${this.employee.id}/historia/`;

    
    const loading = await this.utilsService.loading();
    await loading.present();
    delete this.form2.value.id;
    this.firebaseService.addDocument(path, this.form2.value)
      
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

  async updateHistoria() {
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



  ionViewWillEnter() {
    this.getHistoria()
  }

  getHistoria() {
    let path = `users/${this.user.uid}/empleados/${this.employee.id}/historia`;
    
    this.loading = true

    let sub = this.firebaseService.getCollectionData(path)
      .snapshotChanges().pipe(
        map(changes => changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        })))
      ).subscribe({
        next: (resp: any) => {
          this.employees = resp;
     
          this.loading = false;
          sub.unsubscribe();
        }
      })

      
  }






  

}
