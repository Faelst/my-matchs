import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Keyboard, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

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
import { playerGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

type RouteParams = {
  group: string;
};

export function Players() {
  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const newPlayerNameRef = useRef<TextInput>(null);

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  const handleAddNewPlayer = async () => {
    if (!newPlayerName.trim().length) {
      return Alert.alert('Novo Jogador', 'Informe o nome do jogador');
    }

    const newPlayer = {
      name: newPlayerName,
      team: team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      fetchPlayersByTeam();

      newPlayerNameRef.current?.blur();
      Keyboard.dismiss();
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Novo Jogador', error.message);
      }

      Alert.alert('Novo Jogador', 'Erro ao cadastrar jogador');
    } finally {
      setNewPlayerName('');
    }
  };

  const fetchPlayersByTeam = async () => {
    try {
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      Alert.alert('Jogadores', 'Erro ao buscar jogadores');
    }
  };

  const handleRemovePlayer = async ({ name }: PlayerStorageDTO) => {
    try {
      await playerRemoveByGroup(name, group);
      fetchPlayersByTeam();
      Alert.alert('Jogadores', 'Jogador excluído com sucesso');
    } catch (error) {
      console.log(error);
      Alert.alert('Jogadores', 'Erro ao remover jogador');
    }
  };

  const groupRemove = async () => {
    try {
      await groupRemoveByName(group);
      navigation.navigate('group');
    } catch (error) {
      console.log(error);
      Alert.alert('Remover Grupo', 'Erro ao remover grupo');
    }
  };

  const handleGroupRemove = async () => {
    Alert.alert('Remoer Grupo', 'Deseja remover o grupo?', [
      {
        text: 'Sim',
        onPress: async () => groupRemove(),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  };

  return (
    <S.Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera para jogar" />

      <S.Form>
        <Input
          inputRef={newPlayerNameRef}
          placeholder="Nome do jogador"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddNewPlayer}
          returnKeyType="done"
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
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<ListEmpty message="Nenhum jogador encontrado" />}
        contentContainerStyle={[
          { paddingBottom: 20 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </S.Container>
  );
}
