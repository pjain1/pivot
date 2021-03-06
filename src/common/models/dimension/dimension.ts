'use strict';

import { List, OrderedSet } from 'immutable';
import { Class, Instance, isInstanceOf } from 'immutable-class';
import { $, Expression, ExpressionJS, Action } from 'plywood';
import { makeTitle } from '../../utils/general/general';

var geoName = /continent|country|city|region/i;
function isGeo(name: string): boolean {
  return geoName.test(name);
}

export interface DimensionValue {
  name: string;
  title?: string;
  expression?: Expression;
  type?: string;
}

export interface DimensionJS {
  name: string;
  title?: string;
  expression?: ExpressionJS | string;
  type?: string;
}

var check: Class<DimensionValue, DimensionJS>;
export class Dimension implements Instance<DimensionValue, DimensionJS> {
  static isDimension(candidate: any): boolean {
    return isInstanceOf(candidate, Dimension);
  }

  static getDimension(dimensions: List<Dimension>, dimensionName: string): Dimension {
    dimensionName = dimensionName.toLowerCase(); // Case insensitive
    return dimensions.find(dimension => dimension.name.toLowerCase() === dimensionName);
  }

  static getDimensionByExpression(dimensions: List<Dimension>, expression: Expression): Dimension {
    return dimensions.find(dimension => dimension.expression.equals(expression));
  }

  static fromJS(parameters: DimensionJS): Dimension {
    return new Dimension({
      name: parameters.name,
      title: parameters.title,
      expression: parameters.expression ? Expression.fromJSLoose(parameters.expression) : null,
      type: parameters.type
    });
  }


  public name: string;
  public title: string;
  public expression: Expression;
  public type: string;
  public className: string;

  constructor(parameters: DimensionValue) {
    var name = parameters.name;
    this.name = name;
    this.title = parameters.title || makeTitle(name);
    this.expression = parameters.expression || $(name);
    var type = parameters.type || 'STRING';
    this.type = type;

    if (type === 'STRING' && isGeo(name)) {
      this.className = 'string-geo';
    } else {
      this.className = type.toLowerCase().replace(/_/g, '-');
    }
  }

  public valueOf(): DimensionValue {
    return {
      name: this.name,
      title: this.title,
      expression: this.expression,
      type: this.type
    };
  }

  public toJS(): DimensionJS {
    return {
      name: this.name,
      title: this.title,
      expression: this.expression.toJS(),
      type: this.type
    };
  }

  public toJSON(): DimensionJS {
    return this.toJS();
  }

  public toString(): string {
    return `[Dimension: ${this.name}]`;
  }

  public equals(other: Dimension): boolean {
    return Dimension.isDimension(other) &&
      this.name === other.name &&
      this.title === other.title &&
      this.expression.equals(other.expression) &&
      this.type === other.type;
  }
}
check = Dimension;
