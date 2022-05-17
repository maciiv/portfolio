import * as React from 'react';

export interface ICancelablePromise<T> {
    promise: Promise<T>,
    canceled: boolean
    cancel()
}

export class CancelablePromise<T> implements ICancelablePromise<T> {
    promise: Promise<T>
    canceled: boolean
    cancel() {
        this.canceled = true
    }
    constructor(promise: Promise<T>) {
        this.promise = new Promise((resolve, reject) => {
            promise.then(
                val => (this.canceled ? reject({ isCanceled: true }) : resolve(val)),
                error => (this.canceled ? reject({ isCanceled: true }) : reject(error))
            )
        })
        this.canceled = false
    }
}

export interface IChartMargin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface IPositionTooltip {
    translateX(x: number, width: number, ref: React.RefObject<SVGGElement>): number,
    translateY?(y: number, height: number, ref: React.RefObject<SVGGElement>): number
}

export class PositionTooltip implements IPositionTooltip {
    translateX(x: number, width: number, ref: React.RefObject<SVGGElement>): number {
        if (x === undefined) {
            return 0
        }

        if (ref.current !== null) {
            const tooltipWidth = ref.current.getBoundingClientRect().width;
            if (x + tooltipWidth > width) {
                return x - tooltipWidth - 5
            }
        }
        return x
    }
    translateY(y: number, height: number, ref: React.RefObject<SVGGElement>): number {
        if (y === undefined) {
            return 0
        }

        if (ref.current !== null) {
            const tooltipHeight = ref.current.getBoundingClientRect().height;
            if (y + tooltipHeight > height) {
                return y - tooltipHeight - 10
            }
        }

        return y
    }
}