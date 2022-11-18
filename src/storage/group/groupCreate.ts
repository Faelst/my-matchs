import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '@storage/config';
import { AppError } from '@utils/AppError';
import { groupGetAll } from './gorupGetAll';

export async function groupCreate(groupName: string) {
  try {
    const storageGroups = await groupGetAll();

    const isGroupAlreadyExists = storageGroups.includes(groupName);

    if (isGroupAlreadyExists) {
      throw new AppError('Ja existe um grupo com esse nome');
    }

    const storage = JSON.stringify([...storageGroups, groupName]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
