import { NavigationActions, StackActions } from 'react-navigation'

export const resetScreen = (routeName, params) => {
    return StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName, params })],
      });
}