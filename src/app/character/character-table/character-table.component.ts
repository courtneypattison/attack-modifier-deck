import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { Character } from '../shared/character.model';
import { CharacterService } from '../shared/character.service';

@Component({
  selector: 'amd-character-table',
  templateUrl: './character-table.component.html',
  styleUrls: ['./character-table.component.scss']
})
export class CharacterTableComponent implements OnInit {
  isCharacter: boolean;
  dataSource: MatTableDataSource<Character>;
  displayedColumns = ['name', 'class', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    this.isCharacter = false;
    this.drawTable();
  }

  drawTable() {
    this.characterService
      .getAllCharacters()
      .subscribe((characters: Character[]) => {
        console.log(`characters: (${JSON.stringify(characters)})`);
        if (characters.length) {
          this.isCharacter = true;
        } else {
          this.isCharacter = false;
          return;
        }

        this.dataSource = new MatTableDataSource<Character>(characters);
        this.dataSource.paginator = this.paginator;
      });
  }

  deleteCharacter(characterId: string) {
    this.characterService.deleteCharacter(characterId);
  }

}
