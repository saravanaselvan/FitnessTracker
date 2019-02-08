import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { MatDialog } from "@angular/material";
import { StopTrainingComponent } from "./stop-training.component";

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.css"]
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress = 0;
  trainingTimer;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.resumeTraining();
  }

  resumeTraining() {
    this.trainingTimer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        this.stopTraining();
      }
    }, 1000);
  }
  stopTraining() {
    clearInterval(this.trainingTimer);
    this.dialog
      .open(StopTrainingComponent)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.trainingExit.emit();
        } else {
          this.resumeTraining();
        }
      });
  }
}
