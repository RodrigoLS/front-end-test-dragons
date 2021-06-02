import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Dragon from 'src/app/interfaces/dragon';
import { DragonsApiService } from 'src/app/services/dragonsApi/dragons-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public dragon: Dragon;
  public dragonId: string;

  constructor(
    private dragonsApiService: DragonsApiService,
    private route: ActivatedRoute
    ) {
      this.dragonId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getDragon();
  }

  getDragon(): void {
    this.dragonsApiService.findOneById(this.dragonId).subscribe(data => {
      this.dragon = data;
      
    }, err => {
      console.log(err);
    })
  }

}
