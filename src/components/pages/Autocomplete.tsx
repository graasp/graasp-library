import { BaseItem } from '@algolia/autocomplete-core';
import {
  AutocompleteOptions,
  Render,
  autocomplete,
} from '@algolia/autocomplete-js';
import '@algolia/autocomplete-theme-classic';
import {
  getMeilisearchResults,
  meilisearchAutocompleteClient,
} from '@meilisearch/autocomplete-client';
import axios, { Method } from 'axios';
import { useRouter } from 'next/router';

import { Fragment, createElement, useEffect, useRef } from 'react';
import { render } from 'react-dom';

type AutocompleteProps = Partial<AutocompleteOptions<BaseItem>> & {
  className?: string;
};

const searchClient = meilisearchAutocompleteClient({
  url: 'localhost',
  apiKey: undefined,
  options: {
    httpClient: async (url, opts) => {
      const response = await axios.request({
        url: 'http://localhost:3000/items/collections/search',
        data: opts?.body,
        headers: { 'Content-Type': 'application/json' },
        method: (opts?.method?.toLocaleUpperCase() as Method) ?? 'GET',
      });
      return response.data;
    },
  },
});

function debouncePromise(fn: Function, time: number) {
  let timerId: NodeJS.Timeout;

  return function debounced(...args: any[]) {
    if (timerId) {
      clearTimeout(timerId);
    }

    return new Promise((resolve) => {
      timerId = setTimeout(() => resolve(fn(...args)), time);
    });
  };
}

const debounced = debouncePromise((items: any) => Promise.resolve(items), 500);

const Autocomplete = ({
  className,
  ...autocompleteProps
}: AutocompleteProps) => {
  const router = useRouter();
  const autocompleteContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return undefined;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: autocompleteContainer.current,
      onSubmit({ state }) {
        router.push(`/all-collections?query=${state.query}`);
      },
      getSources() {
        return debounced([
          {
            sourceId: 'items',
            getItems({ query }) {
              return getMeilisearchResults({
                searchClient,
                queries: [
                  {
                    indexName: 'itemIndex',
                    query,
                    params: {
                      hitsPerPage: 10,
                      attributesToSnippet: ['name:10', 'content:35'],
                      snippetEllipsisText: '…',
                    },
                  },
                ],
              });
            },
            getItemUrl({ item }) {
              return `/collections/${item.id}`;
            },
            onSelect({ item }) {
              router.push(`/collections/${item.id}`);
            },
            templates: {
              item({ item, components, html }) {
                return html`<div class="aa-ItemWrapper">
                  <div class="aa-ItemContent">
                    <div class="aa-ItemContentBody">
                      <div class="aa-ItemContentTitle">
                        ${components.Highlight({
                          hit: item,
                          attribute: 'name',
                        })}
                        (${item.type})
                      </div>
                      <div class="aa-ItemContentDescription">
                        ${components.Snippet({
                          hit: item,
                          attribute: 'content',
                        })}
                      </div>
                    </div>
                  </div>
                </div>`;
              },
            },
          },
        ]);
      },

      renderer: { createElement, Fragment, render: render as Render },
    });

    return () => autocompleteInstance.destroy();
  }, []);

  return <div className={className} ref={autocompleteContainer} />;
};

export default Autocomplete;
