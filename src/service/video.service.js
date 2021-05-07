import axios from 'axios';

const VideoService = {
    clearApiGamesResponse(response) {
        return response.events.map((e) => ({
            id: e.id,
            date: e.date,
            name: e.name,
            shortName: e.shortName,
            teams: [
                {
                    name: e.competitions[0]?.competitors[0]?.team.name,
                    score: Number(e.competitions[0]?.competitors[0]?.score),
                    wins: Number(
                        e.competitions[0]?.competitors[0]?.records[0]?.summary.split('-')[0]
                    )
                },
                {
                    name: e.competitions[0]?.competitors[1]?.team.name,
                    score: Number(e.competitions[0]?.competitors[1]?.score),
                    wins: Number(
                        e.competitions[0]?.competitors[1]?.records[0]?.summary.split('-')[0]
                    )
                }
            ]
        }));
    },

    async getNbaGames(dateString) {
        const response = await axios.get(`/api/games?date=${dateString}`);
        return response.data;
    },

    async orderVideos(videos, dateString, nbaGames) {
        nbaGames.forEach((g) => {
            const wins = g.teams[0].wins + g.teams[1].wins;
            const diffScore = Math.abs(g.teams[0].score - g.teams[1].score);
            const weight = wins - diffScore * 2;
            g.weight = weight;
        });

        nbaGames = nbaGames.sort((a, b) => b.weight - a.weight);

        const orderedVideos = [];

        for (let i = 0; i < nbaGames.length; i++) {
            const game = nbaGames[i];
            const video = videos.find((v) =>
                v.title.toLowerCase().includes(game.teams[0].name.toLowerCase())
            );
            orderedVideos.push(video);
        }

        return orderedVideos;
    },

    clearApiHighlightsResponse(apiResponse) {
        return apiResponse.map((v) => ({
            id: v.snippet.resourceId.videoId,
            publishedAt: v.publishedAt,
            title: v.snippet.title,
            description: v.snippet.description,
            thumbnails: v.snippet.thumbnails.standard,
            videoId: v.snippet.resourceId.videoId
        }));
    },

    async getVideos(date) {
        const dateString = date.toISOString().slice(0, 10).replace(/-/g, '');
        const responseGamesApi = await this.getNbaGames(dateString);
        let nbaGames = this.clearApiGamesResponse(responseGamesApi);
        const response = await axios.get('/api/highlights?number=' + nbaGames.length);
        const videos = this.clearApiHighlightsResponse(response.data.items);
        return this.orderVideos(videos, dateString, nbaGames);
    }
};

export default VideoService;
