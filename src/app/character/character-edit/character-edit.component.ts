import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { Character } from '../shared/character.model';
import { CharacterClass } from '../shared/character-class.model';
import { CharacterPerk } from '../shared/character-perk.model';
import { CharacterPerks } from '../shared/character-perks.model';
import { CharacterService } from '../shared/character.service';

@Component({
  selector: 'amd-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.scss']
})
export class CharacterEditComponent implements OnInit {
  character: Character;
  characterId: string;
  characterPerks: CharacterPerk[];
  classes: CharacterClass[];

  characterEditForm = this.formBuilder.group({
    name: [null, Validators.required],
    class: [null, Validators.required],
    perks: this.formBuilder.array([]),
  });


  constructor(
    private characterService: CharacterService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.character = null;
    this.classes = this.characterService.getCharacterClasses();

    this.route.paramMap
      .pipe(take(1))
      .subscribe(params => {
        this.characterId = params.get('id');
        this.characterService
          .getCharacter(this.characterId)
          .then((character: Character) => {
            this.character = character;
            this.characterEditForm
              .get('name')
              .setValue(character.name);
            this.characterEditForm
              .get('class')
              .setValue(character.class);
            this.characterPerks = CharacterPerks[character.class];

            for (const i of Object.keys(this.characterPerks)) {
              this.characterPerks[i].activeCount = character.perks[i];
              this.addPerk(this.characterPerks[i].activeCount);
            }
          });
      });
  }

  onClassChange() {
    this.characterPerks = this.characterEditForm.value.class ? CharacterPerks[this.characterEditForm.value.class] : [];
    this.perks.clear();
    for (const perk of this.characterPerks) {
      this.addPerk(0);
    }
  }

  addPerk(activeCount: number) {
    this.perks.push(this.formBuilder.control(activeCount));
  }

  get perks() {
    return this.characterEditForm.get('perks') as FormArray;
  }

  editCharacter() {
    const characterNew = this.characterEditForm.value;
    characterNew.id = this.characterService.getCharacterId(characterNew.name);
    this.characterService
      .editCharacter(this.character, characterNew)
      .then(any => this.router.navigate(['/character']));
  }

}
