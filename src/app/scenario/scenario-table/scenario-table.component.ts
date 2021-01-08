import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Scenario } from '../shared/scenario.model';
import { ScenarioService } from '../shared/scenario.service';

@Component({
  selector: 'amd-scenario-table',
  templateUrl: './scenario-table.component.html',
  styleUrls: ['./scenario-table.component.scss']
})
export class ScenarioTableComponent implements OnInit {
  isScenario: boolean;
  dataSource: MatTableDataSource<Scenario>;
  displayedColumns = ['id', 'name', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private scenarioService: ScenarioService) { }

  ngOnInit() {
    this.isScenario = false;
    this.drawTable();
  }

  drawTable() {
    this.scenarioService
      .getScenarios()
      .subscribe((scenarios: Scenario[]) => {
        if (scenarios.length) {
          this.isScenario = true;
        } else {
          this.isScenario = false;
          return;
        }

        this.dataSource = new MatTableDataSource<Scenario>(scenarios);
        this.dataSource.paginator = this.paginator;
      });
  }

  deleteScenario(scenarioId: string) {
    this.scenarioService.deleteScenario(scenarioId);
  }
}
