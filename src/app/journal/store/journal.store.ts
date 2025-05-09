import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { PaginatedResult } from '../../core/models/PaginatedResult';
import { JournalEntry } from '../models/JournalEntry';
import { JournalService } from '../services/journal.service';

type JournalStoreState = {
  isLoading: boolean;
  error: string | null;

  //Pagination metadata
  count: number;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
  currentPage: number;
  pageSize: number;
};

const initialState: JournalStoreState = {
  isLoading: false,
  error: null,
  count: 0,
  nextPageUrl: null,
  previousPageUrl: null,
  currentPage: 1,
  pageSize: 10,
};

export const JournalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities<JournalEntry>(),
  withMethods((store, journalService = inject(JournalService)) => {
    const loadEntitiesInternal = rxMethod<{
      page?: number;
      pageSize?: number;
      url?: string;
    }>(
      pipe(
        tap(({ page }) => {
          patchState(store, { isLoading: true, error: null });
          if (page) {
            patchState(store, { currentPage: page });
          }
          patchState(store, setAllEntities<JournalEntry>([]));
        }),
        switchMap(({ page, pageSize, url }) => {
          const finalPageSize = pageSize ?? store.pageSize();
          return journalService
            .getJournalEntries(page, finalPageSize, url)
            .pipe(
              tapResponse({
                next: (response: PaginatedResult<JournalEntry>) => {
                  console.log(response);
                  patchState(store, setAllEntities(response.results), {
                    isLoading: false,
                    error: null,
                    count: response.count,
                    nextPageUrl: response.next,
                    previousPageUrl: response.previous,
                  });
                },
                error: (error) => {
                  console.error('Failed to load journal entries.', error);
                  patchState(store, {
                    isLoading: false,
                    error: 'Failed to load entities.',
                  });
                },
              })
            );
        })
      )
    );

    return {
      loadEntities: loadEntitiesInternal,
      loadNextPage: () => {
        const nextPageUrl = store.nextPageUrl();
        if (nextPageUrl !== null) {
          loadEntitiesInternal({ url: nextPageUrl });
        }
      },
      loadPreviousPage: () => {
        const previousPageUrl = store.previousPageUrl();
        if (previousPageUrl !== null) {
          loadEntitiesInternal({ url: previousPageUrl });
        }
      },
      goToPage: (page: number, pageSize?: number) => {
        loadEntitiesInternal({ page, pageSize: pageSize ?? store.pageSize() });
      },
      updatePageSize: (pageSize: number) => {
        patchState(store, { pageSize });
        loadEntitiesInternal({ page: 1, pageSize });
      },
    };
  }),
  withComputed((store) => ({
    totalEntitiesLoaded: computed(() => store.entities().length),
    totalCountFromApi: computed(() => store.count()),
    totalPages: computed(() => {
      const pageSize = store.pageSize();
      if (pageSize === 0) {
        return 0;
      }
      return Math.ceil(store.count() / pageSize);
    }),
    isFirstPage: computed(
      () => !store.previousPageUrl() && store.currentPage() === 1
    ),
    isLastPage: computed(() => !store.nextPageUrl()),
    hasNoEntities: computed(() => store.entities().length === 0),
  }))
);
