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

import {
  DISC_DISTANCE,
  DISC_HEIGHT,
  DISC_RADIUS,
  DISC_SEGMENTS,
  MARKER_POSITIONS
} from '../../config';

function Model() {
  const { gl } = useThree();

  useFrame(({ clock }, delta) => {
    // return;
  });

  return (
    <group>
      <Disc position={[0, 2 * DISC_DISTANCE, 0]} />
      <Disc position={[0, 1 * DISC_DISTANCE, 0]} />
      <Disc position={[0, 0 * DISC_DISTANCE, 0]} />
      <Disc position={[0, -1 * DISC_DISTANCE, 0]} />
      <Disc position={[0, -2 * DISC_DISTANCE, 0]} />

      {MARKER_POSITIONS &&
        MARKER_POSITIONS.map((position, i) => (
          <Target position={position} key={`target-${i}`} />
        ))}
    </group>
  );
}

function Disc({ position }) {
  const material = useMemo(() => {
    return new MeshStandardMaterial({
      color: 0xfafafa,
      roughness: 0.8,
      metalness: 0.1,
      envMapIntensity: 10
    });
  }, []);

  return (
    <group scale={1}>
      <mesh position={position} material={material} castShadow receiveShadow>
        <cylinderGeometry
          args={[DISC_RADIUS, DISC_RADIUS, DISC_HEIGHT, DISC_SEGMENTS, 1]}
        />
      </mesh>
    </group>
  );
}

function Target({ position }) {
  const material = useMemo(() => {
    return new MeshStandardMaterial({
      color: 0x888888,
      roughness: 0.8,
      metalness: 0.1,
      envMapIntensity: 10
    });
  }, []);

  return (
    <group position={[position[0], position[1] + 0.08, position[2]]}>
      <group scale={0.05}>
        <mesh material={material} castShadow receiveShadow>
          <sphereBufferGeometry args={[1, 16, 16]} />
        </mesh>
      </group>
    </group>
  );
}

export { Model, DISC_DISTANCE, DISC_RADIUS };
