import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateHistoriaclinicaComponent } from './update-historiaclinica.component';

describe('UpdateHistoriaclinicaComponent', () => {
  let component: UpdateHistoriaclinicaComponent;
  let fixture: ComponentFixture<UpdateHistoriaclinicaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHistoriaclinicaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateHistoriaclinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
