import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { BsDot, BsPlay, BsStarFill } from 'react-icons/bs';
import { genBackdropImage } from 'lib/generateImages';
import Link from 'next/link';
import { TMovieItem } from 'types/movieTypes';
import { TTvItem } from 'types/tvTypes';

type HeroProps = {
  data: TMovieItem & TTvItem;
  genres: {
    id: number;
    name: string;
  }[];
};

const Hero: React.FC<HeroProps> = ({ data, genres }) => {
  const formatOverview =
    data.overview.substring(0, Math.min(350, data.overview.length)) +
    (data.overview.length > 350 && '...');

  const filteredGenres = _.filter(genres, o =>
    _.includes(data.genre_ids, o.id)
  );

  return (
    <Flex
      position="relative"
      p={12}
      h={['calc(100vh - 8.5rem)', null, 'xl']}
      align="center"
      justify="flex-end"
      bgImage={`url('${
        data.backdrop_path && genBackdropImage(data.backdrop_path)
      }')`}
      bgSize="cover"
      bgPosition="center"
      zIndex={0}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        bgGradient="linear(to-r, rgba(0,0,0,0), gray.900)"
        zIndex={-1}
      />
      <VStack align="flex-start" spacing={2} maxW={[null, null, '40vw']}>
        <Heading color="white" fontSize={44} lineHeight="none">
          {data.title || data.original_name}
        </Heading>
        <HStack spacing={3}>
          <HStack>
            <Icon as={BsStarFill} color="gray.300" />
            <Text fontSize="sm" color="gray.300">
              {data.vote_average}
            </Text>
          </HStack>
          <Icon as={BsDot} color="gray.300" />
          <Text fontSize="sm" color="gray.300">
            {filteredGenres.map(genre => genre.name).join(', ')}
          </Text>
        </HStack>
        <Text fontSize="sm" pb={6}>
          {formatOverview}
        </Text>
        <HStack>
          <Link href={`/${data.media_type}/${data.id}`} passHref>
            <Button as="a" colorScheme="teal" rounded="full">
              View more
            </Button>
          </Link>
          <Button
            colorScheme="teal"
            rounded="full"
            variant="ghost"
            rightIcon={<BsPlay size={20} />}
          >
            Play Trailer
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default Hero;