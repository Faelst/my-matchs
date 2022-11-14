import * as S from './styles';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';

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
        <Button title="Criar turma" onPress={() => {}} />
      </S.Content>
    </S.Container>
  );
}
