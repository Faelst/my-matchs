import { TouchableOpacityProps } from 'react-native';
import { ButtonTypeProps, Container, Title } from './styles';

type props = TouchableOpacityProps & {
  title: string;
  type?: ButtonTypeProps;
};

export function Button({ title, type = `PRIMARY`, ...rest }: props) {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
