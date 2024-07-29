import {Dimensions} from 'react-native';

let MINUTE = 1000 * 60;

const screen = {
  WIDTH: Dimensions.get('screen').width,
  HEIGHT: Dimensions.get('screen').height,
} as const;

const numbers = {
  ACCESS_TOKEN_REFRESSH_TIME: 60 * MINUTE - 3 * MINUTE,
} as const;

export {numbers, screen};
