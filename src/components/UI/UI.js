import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { shallow } from 'zustand/shallow';
import { nanoid } from 'nanoid';
import { useCamera } from '../Viewer/Camera';
import { CAMERA_POSITIONS } from '../../config';

function UI() {
  return (
    <div className="UI">
      <div className="UI__content">
        <UIPanel id="camera" title="CAMERA" color="#ffbf00">
          <ModelUI />
        </UIPanel>
      </div>
    </div>
  );
}

function UIPanel({
  id,
  title = '',
  color = '#ccc',
  isLightText = false,
  children,
  isInitiallyCollapsed = false
}) {
  const [isCollapsed, setIsCollapsed] = useState(isInitiallyCollapsed);

  return (
    <div
      className={`UIPanel UIPanel--${id} ${isLightText ? ' isLightText' : ''}`}
      style={{ backgroundColor: color }}
    >
      <p
        className="UIPanel__title"
        onClick={() => {
          setIsCollapsed((state) => !state);
        }}
      >
        <span>{title}</span>
      </p>

      {!isCollapsed && <div className="UIPanel__content">{children}</div>}
    </div>
  );
}

function ModelUI() {
  const { setCurrentIndex } = useCamera(
    (state) => ({ setCurrentIndex: state.setCurrentIndex }),
    shallow
  );

  return (
    <div className="UIFields">
      <div className="UIField">
        {CAMERA_POSITIONS &&
          CAMERA_POSITIONS.map((position, i) => (
            <button
              onClick={() => {
                setCurrentIndex(i);
              }}
              className="Button"
              key={`button-${i}`}
            >
              Camera {i}
            </button>
          ))}
      </div>
    </div>
  );
}

export { UI };
