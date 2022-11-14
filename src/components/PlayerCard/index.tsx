import * as S from './styles';

type Props = {
  name: string;
};

export function PlayerCard({ name }: Props) {
  return (
    <S.Container>
      <S.Icon name="person" />

      <S.Name>{name}</S.Name>
    </S.Container>
  );
}
