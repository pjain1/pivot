'use strict';
require('./hover-multi-bubble.css');

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { $, Expression, Executor, Dataset, Datum } from 'plywood';
import { Stage, Clicker, Essence, DataSource, Filter, Dimension, Measure, TimePreset } from '../../../common/models/index';
import { SEGMENT, TIME_SEGMENT } from '../../config/constants';
import { formatTimeRange, DisplayYear } from '../../utils/date/date';
import { BodyPortal } from '../body-portal/body-portal';

const LEFT_OFFSET = 22;

export interface HoverMultiBubbleProps extends React.Props<any> {
  essence: Essence;
  datums: Datum[];
  measure: Measure;
  getY: Function;
  left: number;
  top: number;
}

export interface HoverMultiBubbleState {
}

export class HoverMultiBubble extends React.Component<HoverMultiBubbleProps, HoverMultiBubbleState> {
  public mounted: boolean;

  constructor() {
    super();
    // this.state = {};

  }

  render() {
    const { essence, datums, measure, getY, left, top } = this.props;
    const { colors } = essence;

    if (!datums || !datums[0] || !colors) return null;

    var colorSwabs = datums.map((datum) => {
      var segmentValue = datum[SEGMENT];
      var segmentValueString = String(segmentValue);
      var segmentMeasure = getY(datum);
      var swabStyle = { background: colors.getColor(segmentValue) };
      return <div className="color" key={segmentValueString}>
        <div className="color-swab" style={swabStyle}></div>
        <div className="color-name">{segmentValueString}</div>
        <div className="color-value">{measure.formatFn(segmentMeasure)}</div>
      </div>;
    });

    return <BodyPortal left={left + LEFT_OFFSET} top={top} disablePointerEvents={true}>
      <div className="hover-multi-bubble">
        <div className="bucket">{formatTimeRange(datums[0][TIME_SEGMENT], essence.timezone, DisplayYear.NEVER)}</div>
        <div className="colors">{colorSwabs}</div>
      </div>
    </BodyPortal>;
  }
}
