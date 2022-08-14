import * as React from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContext {
  signIn: (data: any) => Promise<void>;
  signOut: () => void;
  signUp: (data: any) => Promise<void>;
}

interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: null | string;
}

type AuthAction =
  | {
      type: 'RESTORE_TOKEN';
      token: string;
    }
  | {
      type: 'SIGN_IN';
      token: string;
    }
  | {
      type: 'SIGN_OUT';
      token?: never;
    };

const initialAuthState: AuthState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

const AuthContext = React.createContext<AuthContext | undefined>(undefined);

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (typeof context === 'undefined')
    throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

export function useAuthState() {
  const [authState, dispatch] = React.useReducer((prevState: AuthState, action: AuthAction) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
    }
  }, initialAuthState);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
        console.log('userToken', userToken);
      } catch (e) {
        userToken = null;
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);
  return [authState, dispatch] as const;
}

export function AuthProvider({
  children,
  dispatch,
}: {
  children: React.ReactNode;
  dispatch: React.Dispatch<AuthAction>;
}) {
  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        await SecureStore.setItemAsync('userToken', 'dummy-token');
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('userToken');
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        await SecureStore.setItemAsync('userToken', 'dummy-token');
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [dispatch],
  );

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}
