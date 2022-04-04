import { Routes } from "@angular/router";
import { EvaluationComponent } from "./evaluation/evaluation.component";

export const EvaluationRoutes: Routes = [
  {
    path: "evaluations",
    children: [
      {
        path: "",
        component: EvaluationComponent
      }
    ]
  }
];
