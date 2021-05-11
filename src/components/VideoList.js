import React, { useState } from 'react';
import { Card, Image, Text, Hr, Button, useMantineTheme } from '@mantine/core';

import { useListState } from '@mantine/hooks';
import VideoService from '../service/video.service';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function VideoList() {
    const theme = useMantineTheme();
    const secondaryColor =
        theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const [startDate, setStartDate] = useState(yesterday);

    const [state, handlers] = useListState([]);

    const items = state.map((highlight) => (
        <div style={{ width: 340, margin: 'auto', padding: '20px' }} key={highlight?.id}>
            <Card shadow="sm">
                <Image src={highlight?.thumbnails?.url} height={160} alt={highlight?.title} />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10
                    }}>
                    <Text weight={700} size="sm">
                        {highlight?.title}
                    </Text>
                </div>

                <Hr />

                <Text size="sm" style={{ color: secondaryColor }}>
                    {highlight?.publishedAt}
                </Text>

                <Button
                    size="sm"
                    variant="light"
                    color="cyan"
                    fullWidth
                    style={{ marginTop: 10 }}
                    onClick={() => openVideo(highlight)}>
                    Watch video
                </Button>
            </Card>
        </div>
    ));

    function openVideo(highlight) {
        window.open('https://www.youtube.com/watch?v=' + highlight.videoId, '_blank');
    }

    async function videos() {
        const videosList = await VideoService.getVideos(startDate);
        handlers.setState(videosList);
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <Button style={{ marginLeft: '20px' }} onClick={() => videos()}>
                    Search
                </Button>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                <div>{items}</div>
            </div>
        </>
    );
}

export default VideoList;
