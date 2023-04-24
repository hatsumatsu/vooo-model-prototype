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

  const RP1Ref = useRef(); // position Y
  const RP2Ref = useRef(); // orbit 1 + rotation
  const RP3Ref = useRef(); // orbit 2
  const RP4Ref = useRef(); // orbit 2

  const { currentIndex } = useCamera(
    (state) => ({ currentIndex: state.currentIndex }),
    shallow
  );

  useEffect(() => {
    console.log(cameraRef.current);
    if (
      !cameraRef.current ||
      !RP1Ref.current ||
      !RP2Ref.current ||
      !RP3Ref.current ||
      !RP4Ref.current
    )
      return;

    const currentCameraPosition = CAMERA_POSITIONS[currentIndex];

    // reset positions
    RP2Ref.current.position.fromArray([0, 0, 0]);
    RP3Ref.current.position.fromArray([0, 0, 0]);
    cameraRef.current.rotation.fromArray([0, 0, 0]);

    // set rig base position
    RP1Ref.current.position.fromArray(currentCameraPosition);

    // offset RP2 to target
    const direction = new Vector3().subVectors(
      RP1Ref.current.position,
      new Vector3(0, 0, 0)
    );

    RP2Ref.current.position.copy(direction);
    RP3Ref.current.position.copy(direction.negate());

    // make camera look at target
    cameraRef.current.lookAt(new Vector3(0, 0, 0));

    // RP4Ref.current.lookAt(new Vector3(0, 0, 0));
    // RP4Ref.current.quaternion.copy(RP4Ref.current.quaternion.invert());

    console.log(RP4Ref.current.position, RP4Ref.current.rotation);

    cameraRef.current.updateProjectionMatrix();
  }, [currentIndex]);

  useFrame(() => {
    // RP2Ref.current.rotation.x = pointer.y * Math.PI * 0.4;
  });

  return (
    <group>
      <group ref={RP1Ref}>
        <group ref={RP4Ref}>
          <group ref={RP2Ref}>
            <group ref={RP3Ref}>
              <PerspectiveCamera
                makeDefault
                near={0.0001}
                far={200}
                position={[0, 0, 1]}
                ref={cameraRef}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

const useCamera = create((set, get) => ({
  currentIndex: 0,

  setCurrentIndex: (currentIndex) => set({ currentIndex: currentIndex })
}));

export { Camera, useCamera };
