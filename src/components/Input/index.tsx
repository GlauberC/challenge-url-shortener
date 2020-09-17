/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useState,
} from 'react';
import { useTheme } from 'styled-components/native';
import { TextInputProps } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';

import * as S from './styles';

interface InputProps extends TextInputProps {
  iconName: string;
  errMsg: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { iconName, errMsg, value, ...rest },
  ref,
) => {
  const [selected, setSelected] = useState(false);
  const [filled, setFilled] = useState(false);

  const inputElementRef = useRef<any>(null);
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  const handleUnfocus = useCallback((text) => {
    setSelected(false);
    if (text && text !== '') {
      setFilled(true);
    } else {
      setFilled(false);
    }
  }, []);

  const { colors } = useTheme();
  return (
    <>
      <S.Container selected={selected} isErr={errMsg.length > 0}>
        <Icons
          name={iconName}
          size={28}
          color={
            errMsg.length > 0
              ? colors.err
              : filled || selected
              ? colors.prim
              : colors.placeholder
          }
        />
        <S.TextInputBox
          {...rest}
          value={value}
          onFocus={() => setSelected(true)}
          onEndEditing={() => handleUnfocus(value)}
          placeholderTextColor={colors.placeholder}
          ref={inputElementRef}
        />
      </S.Container>
      {errMsg !== '' && <S.ErrInfo>{errMsg}</S.ErrInfo>}
    </>
  );
};

export default forwardRef(Input);
