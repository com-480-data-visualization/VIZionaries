import { matchData } from "../../parser/types"
import { MeanScoreObserver } from "./observer"

export const getAveragePlayPerPosition = (matchArray: matchData[], oberserver: MeanScoreObserver[]) => {
	const nums: number[] = []
	for (const match of matchArray) {
		for (const sets of match.sets) {
			for (const point of sets) {
				for (const action of point.actions) {
					for (const obs of oberserver) {
						obs.addAction(action, point)
					}
				}
			}
		}
	}
}