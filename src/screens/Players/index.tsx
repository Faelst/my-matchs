import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ListEmpty } from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';
import { useState } from 'react';
import { FlatList } from 'react-native';
import * as S from './styles';

export function Players() {
  const [team, setTeam] = useState('');
  const [players, setPlayers] = useState([]);

  return (
    <S.Container>
      <Header showBackButton />

      <Highlight title="Jogadores" subtitle="Adicione a galera para jogar" />

      <S.Form>
        <Input placeholder="Nome do jogador" autoCorrect={false} />
        <ButtonIcon type="PRIMARY" icon="add" />
      </S.Form>

      <S.HeaderList>
        <FlatList
          data={['Time A', 'Time B', 'Time C', 'Time D', 'Time E', 'Time F']}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <Filter
              title={`${item}`}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={true}
        />
        <S.NumberOfPlayers>{players.length}</S.NumberOfPlayers>
      </S.HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ListEmpty message="Nenhum jogador encontrado" />}
        contentContainerStyle={[
          { paddingBottom: 20 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover turma" type="SECONDARY" />
    </S.Container>
  );
}
