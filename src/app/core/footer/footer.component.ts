import { Component } from '@angular/core';

@Component({
  selector: 'amd-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  creator = 'Courtney Pattison';
  currentYear = 2019;
  licenseURL = 'https://github.com/courtneypattison/attack-modifier-deck/blob/master/LICENSE';
  licenseName = 'MIT';
}
