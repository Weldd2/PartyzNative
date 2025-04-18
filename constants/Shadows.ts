import { Colors } from './Colors';

export const Shadows = {
  light: {
    dp25: {
      shadowColor: Colors.light.primary,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    dp30: {
      shadowColor: Colors.light.primary,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 1.41,
      elevation: 3,
    },
  },
  dark: {
    dp25: {
      shadowColor: Colors.dark.primary,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    dp30: {
      shadowColor: Colors.light.primary,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.3,
      shadowRadius: 1.41,
      elevation: 3,
    },
  },
};
