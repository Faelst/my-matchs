import * as S from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

export function NewGroup() {
  return (
    <S.Container>
      <Header showBackButton />

      <S.Content>
        <S.Icon />
        <Highlight
          title="Crie sua turma"
          subtitle="Crie sua turma e jogue com seus amigos"
        />

        <Input placeholder="Nome da turma" style={{ marginBottom: 20 }} />
        <Button title="Criar turma" onPress={() => {}} />
      </S.Content>
    </S.Container>
  );
}
