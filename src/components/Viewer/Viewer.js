import { Suspense, useState, useRef, useCallback, useEffect } from 'react';

import { Canvas, useFrame } from '@react-three/fiber';
import {
  Html,
  OrbitControls,
  TransformControls,
  useHelper,
  Lightformer,
  Environment,
  PerspectiveCamera,
  SoftShadows,
  BakeShadows,
  AccumulativeShadows
} from '@react-three/drei';

import { BoxHelper } from 'three';

import { Model } from './Model';

import { BASE_SIZE } from '../../config';
import { Camera } from './Camera';

function Viewer() {
  return (
    <div className="Viewer">
      <Canvas shadows gl={{}} onCreated={({ gl }) => {}}>
        <color attach="background" args={['#ddd']} />

        <Suspense fallback={null}>
          <Scene />
          <Camera />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene() {
  return (
    <group>
      <Lights />

      <Composition />
    </group>
  );
}

function Lights() {
  return (
    <group>
      <directionalLight castShadow position={[10, 10, 1]} intensity={0.5} />
      <ambientLight intensity={0.5} />

      <Environment>
        <group scale={1}>
          <PointLight
            color="#61dafb"
            position={[-10, -10, -10]}
            intensity={0.2}
          />
          <PointLight color="#fafafa" position={[-10, 0, 15]} intensity={0.8} />

          <PointLight color="#fafafa" position={[-5, 20, 2]} intensity={0.5} />
          <PointLight color="#fafafa" position={[15, 10, -2]} intensity={2} />
          <PointLight color="#fafafa" position={[15, 10, 5]} intensity={1} />
          <PointLight color="#fafafa" position={[5, -10, 5]} intensity={0.8} />
        </group>
      </Environment>
    </group>
  );
}

function PointLight({ ...props }) {
  return <Lightformer {...props} type={'ring'} scale={10} />;
}

function Composition() {
  const boxRef = useRef();

  useHelper(boxRef, BoxHelper, '#000');

  useFrame(({ clock }, delta) => {
    // return;
  });

  return (
    <group scale={1}>
      <Model />
    </group>
  );
}

export { Viewer };
