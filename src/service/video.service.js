import axios from 'axios';
import MockVideos from '../mockVideos';

function clearApiGamesResponse(response) {
  return response.events.map((e) => {
    return {
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
          ),
        },
        {
          name: e.competitions[0]?.competitors[1]?.team.name,
          score: Number(e.competitions[0]?.competitors[1]?.score),
          wins: Number(
            e.competitions[0]?.competitors[1]?.records[0]?.summary.split('-')[0]
          ),
        },
      ],
    };
  });
}

async function getNbaGames() {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const dateString = yesterday.toISOString().slice(0, 10).replace(/-/g, '');
  const response = await axios.get('/api/games?date=' + dateString);
  return response.data;
}

async function orderVideos(videos) {
  const responseGamesApi = await getNbaGames();
  let nbaGames = clearApiGamesResponse(responseGamesApi);
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

    console.log();
    const video = videos.find((v) =>
      v.title.toLowerCase().includes(game.teams[0].name.toLowerCase())
    );

    orderedVideos.push(video);
  }

  return orderedVideos;
}

function clearApiHighlightsResponse(apiResponse) {
  return apiResponse.map((v) => {
    return {
      id: v.id,
      publishedAt: v.publishedAt,
      title: v.snippet.title,
      description: v.snippet.description,
      thumbnails: v.snippet.thumbnails.standard,
      videoId: v.snippet.resourceId.videoId,
    };
  });
}

export async function getVideos() {
  const response = await axios.get('/api/highlights');
  const videos = clearApiHighlightsResponse(response.data.items);
  return orderVideos(videos);
}
