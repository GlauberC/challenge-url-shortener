import React, { useCallback } from 'react';
import { Modal } from 'react-native';
import * as S from './styles';
import ButtonBorder from '../ButtonBorder';
import ButtonFill from '../ButtonFill';

interface IModalData {
  titleButton: string;
  yesNoOption?: boolean;
  message: string;
  toggleState: boolean;
  close(): void;
  handlePressed(): void;
}

const AlertModal: React.FC<IModalData> = ({
  titleButton,
  message,
  toggleState,
  yesNoOption,
  close,
  handlePressed,
}) => {
  const handleExecuteAndClose = useCallback(() => {
    handlePressed();
    close();
  }, [close, handlePressed]);
  return (
    <Modal
      visible={toggleState}
      statusBarTranslucent
      transparent
      animationType="fade"
    >
      <S.ModalShadow>
        <S.ModalContainer>
          <S.ModalText>{message}</S.ModalText>
          <S.ButtonGroup>
            <ButtonFill onPress={handleExecuteAndClose}>
              {yesNoOption ? 'sim' : titleButton}
            </ButtonFill>
            {yesNoOption && <ButtonBorder onPress={close}>não</ButtonBorder>}
          </S.ButtonGroup>
        </S.ModalContainer>
      </S.ModalShadow>
    </Modal>
  );
};

export default AlertModal;
