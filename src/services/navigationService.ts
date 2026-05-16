import { createNavigationContainerRef } from '@react-navigation/native';
import { AppScreens } from '../navigation/AppScreens';

export const navigationRef = createNavigationContainerRef<AppScreens>();

// remove generic completely
export function navigate(
  name: keyof AppScreens,
  params?: AppScreens[keyof AppScreens]
) {
  if (!navigationRef.isReady()) return;

  navigationRef.navigate(name as any, params as any);
}