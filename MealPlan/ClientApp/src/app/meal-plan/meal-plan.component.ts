import { Component, OnInit } from '@angular/core';
import { Observable, Subject, map, merge, tap } from 'rxjs';
import { MealPlanDto, MealPlanService } from 'src/libs/api-client';

@Component({
  selector: 'app-meal-plan',
  templateUrl: './meal-plan.component.html',
  styleUrls: ['./meal-plan.component.css']
})
export class MealPlanComponent implements OnInit {
  mealPlanEntries!: MealPlanDto[];
  private startDate: Date;
  private endDate: Date;

  constructor (private mealPlanService : MealPlanService) {
    this.startDate = new Date();
    this.endDate = this.addDays(this.startDate, 7);
  }

  ngOnInit(): void {
    this.mealPlanService.apiMealPlanGet(this.dateToString(this.startDate), this.dateToString(this.endDate))
        .subscribe(data => this.mealPlanEntries = data);
  }

  private addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  private dateToString(date: Date) : string {
    return date.toISOString().split('T')[0];
  }

  public onLoadMore() {
    let newStartDate = this.addDays(this.endDate, 1);
    this.endDate = this.addDays(this.endDate, 7);

    this.mealPlanService.apiMealPlanGet(this.dateToString(newStartDate), this.dateToString(this.endDate))
        .subscribe(data => this.mealPlanEntries.push(...data));
  }
}
