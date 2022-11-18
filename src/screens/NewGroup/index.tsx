import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as S from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';

export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  const handleNew = async () => {
    try {
      if (!group.trim().length) {
        throw new AppError('Informe o nome da turma corretamente');
      }

      await groupCreate(group);
      navigation.navigate('players', { group });
    } catch (error) {
      if (error instanceof AppError) {
        return Alert.alert('Novo Grupo', error.message);
      }

      Alert.alert('Novo Grupo', 'Erro ao cadastrar grupo');
      console.log(error);
    }
  };

  return (
    <S.Container>
      <Header showBackButton />

      <S.Content>
        <S.Icon />
        <Highlight
          title="Crie sua turma"
          subtitle="Crie sua turma e jogue com seus amigos"
        />

        <Input
          placeholder="Nome da turma"
          style={{ marginBottom: 20 }}
          onChangeText={setGroup}
        />
        <Button title="Criar turma" onPress={handleNew} />
      </S.Content>
    </S.Container>
  );
}
