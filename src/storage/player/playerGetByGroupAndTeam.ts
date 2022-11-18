import { playerGetByGroup } from './playerGetByGroup';

export async function playerGetByGroupAndTeam(group: string, team: string) {
  try {
    const players = await playerGetByGroup(group);

    const playersByTeam = players.filter((player) => player.team === team);

    return playersByTeam || [];
  } catch (error) {
    throw error;
  }
}
