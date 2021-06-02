import { Component, OnInit } from '@angular/core';
import Dragon from 'src/app/interfaces/dragon';
import { DragonsApiService } from 'src/app/services/dragonsApi/dragons-api.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  public dragons: Dragon[];
  public removeDragonId: string;

  constructor(private dragonsApiService: DragonsApiService) {

  }

  ngOnInit(): void {
    this.getDragons();
  }

  getDragons(): void {
    this.dragonsApiService.getAll().subscribe(data => {
      this.dragons = data;
    }, err => {
      console.log('ERROR');
    })
  }

  removeDragon(): void {
    this.dragonsApiService.delete(this.removeDragonId).subscribe(data => {
      const indexRemove = this.dragons.findIndex(element => { return element.id == this.removeDragonId });
      this.dragons.splice(indexRemove, 1);
    }, err => {
      console.log(err);
    }, () => {
      this.closeModalRemoveDragon();
    })
  }

  showModalRemoveDragon(id: string): void {
    this.removeDragonId = id;
    $('#removeDragonModal').modal('toggle');
  }

  closeModalRemoveDragon(): void {
    $("#removeDragonModal").modal("hide");
  }

}
