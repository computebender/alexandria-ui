export interface JournalEntry {
  id: number;
  draft_text: string;
}

export type CreateJournalEntry = Pick<JournalEntry, 'draft_text'>;
