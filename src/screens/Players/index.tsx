import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import * as S from './styles';

export function Players() {
  return (
    <S.Container>
      <Header showBackButton />

      <Highlight title="Jogadores" subtitle="Adicione a galera para jogar" />

      <S.Form>
        <Input placeholder="Nome do jogador" autoCorrect={false} />
        <ButtonIcon type="PRIMARY" icon="add" />
      </S.Form>

      <Filter title="Time A" isActive />
      <Filter title="Time A" isActive />
    </S.Container>
  );
}
