import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  standalone: false,
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class MainPageComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() { }
}
