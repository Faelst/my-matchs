import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/config';
import { groupGetAll } from './gorupGetAll';

export async function groupRemoveByName(groupName: string) {
  try {
    const storageGroup = await groupGetAll();
    const filtered = storageGroup.filter((group) => group !== groupName);
    const groups = JSON.stringify(filtered);
    await AsyncStorage.setItem(GROUP_COLLECTION, groups);
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`);
  } catch (error) {
    throw error;
  }
}
