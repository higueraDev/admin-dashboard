import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Event, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { Breadcrumb } from '../../models/breadcrumb';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public title: string = '';
  private titleSubscription: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.titleSubscription = this.getRouteData();
  }

  getRouteData() {
    return this.router.events
      .pipe(
        filter(
          (e: Event) =>
            e instanceof ActivationEnd &&
            Object.keys(e.snapshot.data).length > 0
        ),
        map((e: Event) => {
          const event = e as ActivationEnd;
          return event.snapshot.data as Breadcrumb;
        })
      )
      .subscribe((data: Breadcrumb) => {
        this.setTitle(data);
      });
  }

  setTitle({ title }: Breadcrumb) {
    document.title = title;
    this.title = title;
  }

  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe();
  }
}
