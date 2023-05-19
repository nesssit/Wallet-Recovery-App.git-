import React from 'react';
import {StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';

interface ToastChildren {
  visible: boolean;
  setVisible: any;
  label: any;
}
const Toast = ({visible, setVisible, label}: ToastChildren) => {
  return (
    <Snackbar visible={visible} onDismiss={() => setVisible(false)} style={styles.root}>
      {label}
    </Snackbar>
  );
};
export default Toast;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 50,
    left: 4,
    right: 4,
  },
});
