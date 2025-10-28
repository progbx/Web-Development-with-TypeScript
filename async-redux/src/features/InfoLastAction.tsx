import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const InfoLastAction: React.FC = () => {
  const lastAction = useSelector((state: RootState) => state.info.lastAction);
  return (
    <div className="info-last-action">
      {lastAction === null
        ? 'No Updates in This Session'
        : `Last Action: ${lastAction}`}
    </div>
  );
};

export default InfoLastAction;
