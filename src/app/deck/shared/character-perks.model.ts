import { Character } from './character.model';
import { DeckModifier } from './deck-modifier.model';
import { Perk } from './perk.model';

function createPerk(activeCount: number, description: string, count: number, deckModifier: DeckModifier): Perk {
  return {
    activeCount: activeCount,
    description: description,
    count: count,
    deckModifier: deckModifier,
  };
}

const SpellweaverPerks = [
  createPerk(1, 'Remove four +0 cards', 1, { '+0': -4 }),
  createPerk(2, 'Replace one -1 card with one +1 card', 2, { '-1': -1, '+1': 1 }),
  createPerk(2, 'Add two +1 cards', 2, { '+1': 2 }),
  createPerk(1, 'Add one +0 STUN card', 1, { '+0 STUN': 1 }),
  createPerk(1, 'Add one +0 WOUND card', 1, { '+1 WOUND': 1 }),
  createPerk(0, 'Add one +0 IMMOBILIZE card', 1, { '+1 IMMOBILIZE': 1 }),
  createPerk(0, 'Add one +0 CURSE card', 1, { '+1 CURSE': 1 }),
  createPerk(2, 'Add one +2 FIRE card', 2, { '+2 FIRE': 1 }),
  createPerk(0, 'Add one +2 ICE card', 2, { '+2 ICE': 1 }),
  createPerk(0, 'Add one EARTH card and one WIND card', 2, { 'EARTH': 1, 'WIND': 1 }),
  createPerk(0, 'Add one SUN card and one MOON card', 2, { 'SUN': 1, 'MOON': 1 }),
];

const CragheartPerks = [
  createPerk(1, 'Remove four +0 cards', 1, { '+0': -4 }),
  createPerk(3, 'Replace one -1 card with one +1 card', 3, { '-1': -1, '+1': 1 }),
  createPerk(0, 'Add one -2 card and two +2 cards', 1, { '-2': 1, '+2': 2 }),
  createPerk(2, 'Add one +0 IMMOBILIZE card', 2, { '+1 IMMOBILIZE': 1 }),
  createPerk(2, 'Add one +2 MUDDLE card', 2, { '+2 MUDDLE': 1 }),
  createPerk(1, 'Add two PUSH 2 cards', 1, { 'PUSH 2': 2 }),
  createPerk(0, 'Add two EARTH cards', 2, { 'EARTH': 2 }),
  createPerk(0, 'Add two WIND cards', 1, { 'WIND': 2 }),
];

export const CharacterPerks = {
  Spellweaver: SpellweaverPerks,
  Cragheart: CragheartPerks,
}