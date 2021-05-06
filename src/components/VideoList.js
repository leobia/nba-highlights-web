import React from 'react';
import {
  Card,
  Image,
  Text,
  Hr,
  Badge,
  Button,
  useMantineTheme,
} from '@mantine/core';

import { useListState } from '@mantine/hooks';
import { getVideos } from '../service/video.service';

function VideoList() {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  const [state, handlers] = useListState([]);

  const items = state.map((highlight) => {
    return (
      <div
        style={{ width: 340, margin: 'auto', padding: '20px' }}
        key={highlight.id}
      >
        <Card shadow="sm">
          <Image
            src={highlight.thumbnails.url}
            height={160}
            alt={highlight.title}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Text weight={500}>Norway Fjord Adventures</Text>
            <Badge
              color="red"
              variant={theme.colorScheme === 'dark' ? 'light' : 'filled'}
            >
              On Sale
            </Badge>
          </div>

          <Text size="sm" style={{ color: secondaryColor }}>
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </Text>

          <Hr />

          <Text size="sm" style={{ color: secondaryColor }}>
            Book Norway tour today and get a 5% discount
          </Text>

          <Button
            size="sm"
            variant="light"
            color="cyan"
            fullWidth
            style={{ marginTop: 10 }}
          >
            Book classic tour
          </Button>
        </Card>
      </div>
    );
  });

  async function videos() {
    const videos = await getVideos();
    console.log(videos);
    handlers.setState(videos);
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      <div>
        <Button onClick={videos}>Search</Button>
      </div>
      <div>{items}</div>
    </div>
  );
}

export default VideoList;
