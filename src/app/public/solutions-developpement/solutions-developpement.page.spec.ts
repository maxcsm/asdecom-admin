import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SolutionsDeveloppementPage } from './solutions-developpement.page';

describe('SolutionsDeveloppementPage', () => {
  let component: SolutionsDeveloppementPage;
  let fixture: ComponentFixture<SolutionsDeveloppementPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionsDeveloppementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SolutionsDeveloppementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
