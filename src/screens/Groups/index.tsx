import { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import * as S from './styles';
import { Button } from '@components/Button';
import { groupGetAll } from '@storage/group/gorupGetAll';
import { Loading } from '@components/loading';

export function Groups() {
  const navigation = useNavigation();

  const [isLoaded, setIsLoaded] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  const handleNewGroup = () => {
    navigation.navigate('new');
  };

  const fetchGroups = async () => {
    try {
      setIsLoaded(true);
      const storageGroups = await groupGetAll();
      setGroups(storageGroups);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoaded(false);
    }
  };

  const handleOpenGroup = (group: string) => {
    navigation.navigate('players', { group });
  };

  return (
    <S.Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com sua turma" />

      {isLoaded ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma ?" />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
        />
      )}

      <Button title="Cadastrar turma" onPress={handleNewGroup} />
    </S.Container>
  );
}
