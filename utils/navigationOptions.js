// utils/navigationOptions.js
import HeaderLogo from '../components/layout/HeaderLogo';

export const commonScreenOptions = ({ title, headerRight }) => ({
  title,
  headerLeft: () => <HeaderLogo />,
  headerTintColor: '#000',
  headerTitleStyle: {
    fontWeight: 'normal',
    fontSize: 20,
  },
  headerStyle: {
    backgroundColor: '#fff', // Set the header background color
  },
  headerRight,
  gestureEnabled: true,
  gestureDirection: 'horizontal',
});
