import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {
  public intervalSubscription: Subscription;

  constructor() {
    this.intervalSubscription = this.returnInterval().subscribe({
      next: (value) => console.log(value),
      error: (err) => console.warn('Error:' + err),
      complete: () => console.log('Process complete'),
    });
  }

  returnInterval() {
    return interval(100).pipe(
      take(5),
      map((v) => v + 1),
      filter((v) => (v % 2 ? true : false)),
      retry(1)
    );
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}
