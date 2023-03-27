'use client';

import { ActionIcon, Loader, TextInput, useMantineTheme } from '@mantine/core';
import { IconArrowLeft, IconArrowRight, IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { useQuery } from 'urql';
import { graphql } from '../../graphql-client';
import { LibraryElementList } from '../LibraryElementList/LibraryElementList';

interface ContainerProps {
  searchResult: Array<{
    id: string;
    name: string;
    tags: Array<{ name: string }>;
    markdown: string;
    languageCode: string;
    sourceUrl: string;
    sourceName: string;
    sourceBaseUrl: string;
    licenseName: string;
    licenseUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
  onSearchClick?: (searchText: string) => void;
  isSearching: boolean;
}

export const LibraryPage: React.FC<ContainerProps> = ({
  searchResult,
  isSearching,
  onSearchClick,
}) => {
  const [searchText, setSearchText] = useState('');
  const theme = useMantineTheme();

  const SearchElementTabQuery = graphql(`
    query SearchElements($input: ElementSearchInput!) {
      searchElements(input: $input) {
        element {
          id
          name
        }
      }
    }
  `);

  const [queryResult] = useQuery({
    query: SearchElementTabQuery,
    variables: { input: { text: searchText, limit: 20 } },
  });

  console.log('query result =', queryResult);

  return (
    <>
      <TextInput
        style={{ flex: 1 }}
        icon={<IconSearch />}
        value={searchText}
        onChange={(event) => setSearchText(event?.currentTarget.value)}
        type="search"
        rightSection={
          isSearching ? (
            <Loader size="xs" />
          ) : (
            <ActionIcon
              size={32}
              radius="xl"
              color={theme.primaryColor}
              variant="filled"
              onClick={() => onSearchClick(searchText)}
            >
              {theme.dir === 'ltr' ? (
                <IconArrowRight size="1.1rem" stroke={1.5} />
              ) : (
                <IconArrowLeft size="1.1rem" stroke={1.5} />
              )}
            </ActionIcon>
          )
        }
      />
      <LibraryElementList elements={searchResult} />
    </>
  );
};
