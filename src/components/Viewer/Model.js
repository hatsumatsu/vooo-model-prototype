import {
  Suspense,
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useLayoutEffect
} from 'react';

import { useFrame, useThree } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';

function Model() {
  const { gl } = useThree();

  useFrame(({ clock }, delta) => {
    // return;
  });

  return <group></group>;
}

export { Model };
