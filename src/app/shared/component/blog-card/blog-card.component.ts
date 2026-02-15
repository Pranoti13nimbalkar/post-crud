import { Component, Input, OnInit } from '@angular/core';
import { IBlog } from '../../models/blogs';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
@Input() blogObj!: IBlog
  constructor() { }

  ngOnInit(): void {
  }

}
