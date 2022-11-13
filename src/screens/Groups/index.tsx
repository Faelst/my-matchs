import { useState } from 'react';
import { FlatList } from 'react-native';

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';

import * as S from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  return (
    <S.Container>
      <Header />

      <Highlight title="Turmas" subtitle="Jogue com sua turma" />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => { }}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma ?" />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
      />
    </S.Container>
  );
}
