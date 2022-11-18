import { useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import * as S from './styles';

import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { ListEmpty } from '@components/ListEmpty';
import { PlayerCard } from '@components/PlayerCard';
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';

type RouteParams = {
  group: string;
};

export function Players() {
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const [team, setTeam] = useState('');
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddNewPlayer = async () => {
    if (!newPlayerName.trim().length) {
      return Alert.alert('Novo Jogador', 'Informe o nome do jogador');
    }

    const newPlayer = {
      name: newPlayerName,
      group,
    };

    try {
      await playerAddByGroup(newPlayer, group);
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Novo Jogador', error.message);
      }

      Alert.alert('Novo Jogador', 'Erro ao cadastrar jogador');
    } finally {
      setNewPlayerName('');
    }
  };

  return (
    <S.Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera para jogar" />

      <S.Form>
        <Input
          placeholder="Nome do jogador"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon type="PRIMARY" icon="add" onPress={handleAddNewPlayer} />
      </S.Form>

      <S.HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
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
