
import {
  Directive, HostListener
}
from '@angular/core';

@Directive({
  selector: '[scrollTracker]'
})
export class ScrollTrackerDirective {
  @HostListener('scroll', ['$event'])

  onScroll(event) {
  
    let tracker = event.target;

    let limit = tracker.scrollHeight - tracker.clientHeight;
    if (event.target.scrollTop === limit) {
      //alert('end reached');
    }
  }

  constructor() {}
}
