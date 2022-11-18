import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import * as S from './styles';
import { Button } from '@components/Button';
import { groupGetAll } from '@storage/group/gorupGetAll';

export function Groups() {
  const navigation = useNavigation();

  const [groups, setGroups] = useState<string[]>([]);

  useEffect(() => {
    fetchGroups();
  }, [groups]);

  const handleNewGroup = () => {
    navigation.navigate('new');
  };

  const fetchGroups = async () => {
    try {
      const storageGroups = await groupGetAll();
      setGroups(storageGroups);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} onPress={() => {}} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma ?" />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
      />

      <Button title="Cadastrar turma" onPress={handleNewGroup} />
    </S.Container>
  );
}
