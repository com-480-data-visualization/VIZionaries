import fs from "fs"
import { matchData } from "../parser/types"
import computeAggregations from "./aggregation"

const matchArray = JSON.parse(fs.readFileSync("./dataVolley.json", "utf-8")) as matchData[]

// console.log(matchArray)
console.log(computeAggregations(matchArray))
