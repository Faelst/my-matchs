import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/config';
import { AppError } from '@utils/AppError';
import { playerGetByGroup } from './playerGetByGroup';
import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storagePlayers = await playerGetByGroup(group);

    const isPlayerAlreadyExists = storagePlayers.some(
      (player) => player.name === newPlayer.name
    );

    if (isPlayerAlreadyExists) {
      throw new AppError('Já existe um jogador com esse nome');
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (error) {
    throw error;
  }
}
