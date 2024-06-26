import * as Plot from "@observablehq/plot"
import { useEffect, useMemo, useRef } from "react"
import { convertToTargetArea, AreaTargetType } from "../helper/convertToArea"
import markings from "../helper/volleyballMarkings"

export default function AreaPlot({ data }: { data: AreaTargetType[] }) {
	const containerRef = useRef<HTMLDivElement>(null)

	const areaData = useMemo(() => convertToTargetArea(data), [data])

	useEffect(() => {
		const plot = Plot.plot({
			className: "w-full",
			height: 640,
			axis: null,

			x: { domain: [-0.5, 6.5], label: "Y-pos" },
			y: { domain: [-0.5, 6.5] },
			color: { type: "linear", scheme: "ylgnbu", legend: true, label: "Attempts" },
			marks: [
				Plot.rect(areaData, {
					x: "x",
					y: "y",
					fill: "count",
					interval: 1,
					opacity: 0.8,
				}),
				...markings({}),
			],
		})

		containerRef.current?.append(plot)
		return () => plot.remove()
	}, [areaData])

	return <div className="flex justify-center align-center w-full" ref={containerRef} />
}
