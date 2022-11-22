import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'smartcore-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit{
  @Input() circleSize = 150;
  @Input() animationDuration = 2;
  @Input() progressThickness = 3;
  @Input() text!: string;
  @Input() subText!: string;
  
  animationTime = '2s';
  sizeStyle = { height: '150px', width: '150px' }
  radius = 21;

  ngOnInit(): void {
    this.animationTime = `${this.animationDuration}s`;
    this.sizeStyle = { height: `${this.circleSize}px`, width: `${this.circleSize}px` }
  }
}
