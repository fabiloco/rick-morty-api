import { CronJob } from 'cron';
import axios from 'axios';
import { Character } from '../models/character';

export const runCharacterUpdate = async () => {
  const allCharacters: any[] = [];
  let nextPage = 'https://rickandmortyapi.com/api/character';

  while (nextPage) {
    const { data } = await axios.get(nextPage);
    allCharacters.push(...data.results);
    nextPage = data.info.next;
  }

  // se hace un shuffle para que no se repitan los personajes
  const shuffled = allCharacters.sort(() => 0.5 - Math.random());
  // se seleccionan los primeros 15 personajes
  const selected = shuffled.slice(0, 15);

  const charactersToInsert = selected.map((c) => ({
    name: c.name,
    status: c.status,
    species: c.species,
    gender: c.gender,
    origin: c.origin.name,
    image: c.image,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await Character.destroy({ where: {} });
  await Character.bulkCreate(charactersToInsert);
};

export const updateCharactersJob = () => {
  const job = new CronJob('0 0 */12 * * *', runCharacterUpdate, null, true, 'UTC');
  job.start();
};
