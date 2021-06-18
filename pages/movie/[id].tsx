import React from 'react';
import { Container, Spinner } from '@chakra-ui/react';
import fetcher from 'lib/fetcher';
import { useQueriesTyped } from 'lib/useQueriesTyped';
import _ from 'lodash';
import { SinglePageHeader, CastCardList } from 'components';

type SingleMoviePageProps = {
  query: {
    id: string;
  };
};

const SingleMoviePage = ({ query }: SingleMoviePageProps) => {
  const dataQuery = useQueriesTyped([
    {
      queryKey: `movie${query.id}`,
      queryFn: () => fetcher(`/movie/${query.id}`),
    },
    {
      queryKey: `movieCredits${query.id}`,
      queryFn: () => fetcher(`/movie/${query.id}/credits`),
    },
  ]);

  if (dataQuery.some(query => query.isLoading))
    return <Spinner colorScheme="teal" />;

  console.log(_.filter(dataQuery[1].data.crew, { job: 'Screenplay' }));

  return (
    <>
      <SinglePageHeader data={dataQuery[0].data} />
      <Container>
        <CastCardList
          heading="Cast"
          data={dataQuery[1].data.cast.slice(0, 15)}
        />
      </Container>
    </>
  );
};

export default SingleMoviePage;
