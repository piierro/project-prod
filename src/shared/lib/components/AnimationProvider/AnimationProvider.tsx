import { 
  ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState
} from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react')

interface AnimationContextPayload {
  Gesture?: GestureType;
  Spring?: SpringType;
  isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});

// Обе библиотеки завист друг от друга
const getAsyncAnimationModule = async() => {
  return Promise.all([
    import('@react-spring/web'),
    import('@use-gesture/react')
  ])
}

export const useAnimationLibs = () => {
  return useContext(AnimationContext) as Required<AnimationContextPayload>;
}

export const AnimationProvider = ({children}: {children: ReactNode}) => {
  const SpringRef = useRef<SpringType>();
  const GestureRef = useRef<GestureType>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAsyncAnimationModule().then(([Spring, Gesture]) => {
      SpringRef.current = Spring;
      GestureRef.current = Gesture;
      setIsLoaded(true)
    })
  }, [])

  const defaultProps = useMemo(() => ({
    Gesture: GestureRef.current,
    Spring: SpringRef.current,
    isLoaded
  }), [isLoaded])
  
  return (
    <AnimationContext.Provider value={defaultProps}>
      {children}
    </AnimationContext.Provider>
  )
}