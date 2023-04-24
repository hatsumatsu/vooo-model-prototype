import { Suspense, useState, useRef, useCallback, useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import { BoxHelper, Vector3 } from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Html,
  OrbitControls,
  TransformControls,
  useHelper,
  Lightformer,
  Environment,
  PerspectiveCamera
} from '@react-three/drei';

import { Perf } from 'r3f-perf';

import { BASE_SIZE, CAMERA_POSITIONS } from '../../config';

import { create } from 'zustand';

function Camera({}) {
  const { pointer, viewport } = useThree();

  const cameraRef = useRef(); //

  const { currentIndex } = useCamera(
    (state) => ({ currentIndex: state.currentIndex }),
    shallow
  );

  useEffect(() => {}, []);

  useFrame(() => {});

  return (
    <group>
      <PerspectiveCamera
        makeDefault
        near={0.0001}
        far={200}
        position={[0, 0, 1]}
        ref={cameraRef}
      />
    </group>
  );
}

const useCamera = create((set, get) => ({
  currentIndex: 0,

  setCurrentIndex: (currentIndex) => set({ currentIndex: currentIndex })
}));

export { Camera, useCamera };
