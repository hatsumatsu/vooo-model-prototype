import { Suspense, useState, useRef, useCallback, useEffect } from 'react';
import { shallow } from 'zustand/shallow';

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

import { Perf } from 'r3f-perf';
import { DISC_DISTANCE, DISC_RADIUS, Model } from './Model';

import { BASE_SIZE } from '../../config';
import { create } from 'zustand';
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

        <Perf position="bottom-left" deepAnalyze={true} matrixUpdate={true} />
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
      <mesh ref={boxRef} visible={false} scale={2}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'#eee'} roughness={0.8} metalness={0.3} />
      </mesh>

      <mesh scale={0.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={'#eee'} roughness={0.8} metalness={0.3} />
      </mesh>
    </group>
  );
}

export { Viewer };
