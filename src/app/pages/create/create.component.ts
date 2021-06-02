import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Dragon from 'src/app/interfaces/dragon';
import { DragonsApiService } from 'src/app/services/dragonsApi/dragons-api.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public createForm: FormGroup = this.fb.group({
    name: new FormControl('', [ Validators.required ]),
    type: new FormControl('', [ Validators.required ]),
    histories: new FormControl('', [ Validators.required ])
  })

  constructor(
    private dragonsApiService: DragonsApiService, 
    private fb: FormBuilder,
    private router: Router) { 
    
  }

  ngOnInit(): void {

  }

  create(): void {
    const { name, type, histories } = this.createForm.value;

    this.dragonsApiService.create(name, type, histories).subscribe(data => {
      this.router.navigate(['/'])
      
    }, err => {
      console.log(err);
    })
  }

}
