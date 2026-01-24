import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criterias-list',
  templateUrl: './criterias-list.component.html',
  styleUrl: './criterias-list.component.css',
  standalone: false,
})
export class CriteriasListComponent {
  criteriaListForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.criteriaListForm = new FormGroup({
      genre: new FormControl('',),
      mood: new FormControl(''),
      era: new FormControl(''),
      language: new FormControl(''),
      tempo: new FormControl(''),
      artist: new FormControl('')
    });
  }
}
