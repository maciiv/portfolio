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

export interface Chart {
    width: number;
    height: number;
    margin: IChartMargin;
    x: IChartAxis,
    y: IChartAxis
}

export interface IChartMargin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface IChartAxis {
    scale: d3.ScaleBand<string> | d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never>;
    axis: d3.Axis<d3.AxisDomain>;
    label: string;
}
