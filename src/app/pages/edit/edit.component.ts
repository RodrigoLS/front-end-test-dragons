import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DragonsApiService } from 'src/app/services/dragonsApi/dragons-api.service';
import Dragon from 'src/app/interfaces/dragon';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public dragonId: string;

  public editForm: FormGroup = this.fb.group({
    name: new FormControl('', [ Validators.required ]),
    type: new FormControl('', [ Validators.required ]),
    histories: new FormControl('', [ Validators.required ])
  })
  
  constructor(
    private dragonsApiService: DragonsApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,) {

    this.dragonId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getDragon();
  }

  getDragon(): void {
    this.dragonsApiService.findOneById(this.dragonId).subscribe(data => {
      this.setFormValues(data);
    }, err => {
      console.log(err)
    })
  }

  setFormValues(data: Dragon) {
    this.editForm.setValue({
      name: data.name,
      type: data.type,
      histories: data.histories
    })
  }

  edit(): void {
    const { name, type, histories } = this.editForm.value;
    this.dragonsApiService.update(this.dragonId, name, type, histories).subscribe(data => {
      this.router.navigate(['/']);
    
    }, err => {
      console.log(err);
    })
  }

}
