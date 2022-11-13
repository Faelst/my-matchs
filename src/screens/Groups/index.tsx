import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { useState } from 'react';
import { FlatList } from 'react-native';
import * as S from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Galera da rocket', 'Galera da rocket', 'Galera da rocket', 'Galera da rocket', 'Galera da rocket', 'Galera da rocket', 'Galera da rocket']);

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
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </S.Container>
  );
}
