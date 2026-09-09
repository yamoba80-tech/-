import React from 'react';
import { RawToInfoSimulation } from './RawToInfoSimulation';
import { BooleanFilterSimulation } from './BooleanFilterSimulation';
import { CentralTendencySimulation } from './CentralTendencySimulation';
import { ProbabilityBellSimulation } from './ProbabilityBellSimulation';
import { VectorSimilaritySimulation } from './VectorSimilaritySimulation';
import { GradientDescentSimulation } from './GradientDescentSimulation';

interface SimulationContainerProps {
  type?: 'raw-to-info' | 'boolean-filter' | 'central-tendency' | 'probability-bell' | 'vector-similarity' | 'gradient-descent';
}

export const SimulationContainer: React.FC<SimulationContainerProps> = ({ type }) => {
  if (!type) return null;

  switch (type) {
    case 'raw-to-info':
      return <RawToInfoSimulation />;
    case 'boolean-filter':
      return <BooleanFilterSimulation />;
    case 'central-tendency':
      return <CentralTendencySimulation />;
    case 'probability-bell':
      return <ProbabilityBellSimulation />;
    case 'vector-similarity':
      return <VectorSimilaritySimulation />;
    case 'gradient-descent':
      return <GradientDescentSimulation />;
    default:
      return null;
  }
};
