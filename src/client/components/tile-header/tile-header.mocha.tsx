'use strict';

import { expect } from 'chai';
import * as sinon from 'sinon';
import { setupDOM } from '../../utils/jsdom-setup';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as TestUtils from 'react-addons-test-utils';

import { $, Expression } from 'plywood';
import { TileHeader } from './tile-header';

describe('TileHeader', () => {
  setupDOM();

  it('adds the correct class', () => {
    var renderedComponent = TestUtils.renderIntoDocument(
      <TileHeader
        onClose={null}
        onDragStart={null}
        onSearch={null}
        title={null}
      />
    );

    expect(TestUtils.isCompositeComponent(renderedComponent), 'should be composite').to.equal(true);
    expect((ReactDOM.findDOMNode(renderedComponent) as any).className, 'should contain class').to.contain('tile-header');
  });

});
