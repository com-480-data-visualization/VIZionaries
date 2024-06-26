import { useLocation, useNavigate } from "react-router-dom"
import playerAttack from "../images/player_attack.png"
import playerBlock from "../images/player_block.png"
import playerDefence from "../images/player_defense.png"
import playerReception from "../images/player_reception.png"
import playerService from "../images/player_service.png"
import playerSet from "../images/player_set.png"
import { getPlayer, getTeams } from "../helper/playerHelper"
import classNames from "classnames"

const navigationIcons = [
	{
		name: "Service",
		image: playerService,
		href: "#service",
	},
	{
		name: "Attack",
		image: playerAttack,
		href: "#attack",
	},
	{
		name: "Block",
		image: playerBlock,
		href: "#block",
	},
	{
		name: "Defence",
		image: playerDefence,
		href: "#defence",
	},
	{
		name: "Reception",
		image: playerReception,
		href: "#reception",
	},
	{
		name: "Set",
		image: playerSet,
		href: "#set",
	},
]

const positions = ["S", "O", "A", "M", "L"]

export default function PlayerHead() {
	const navigation = useNavigate()
	const location = useLocation()
	const { playerId, position, teamId } = location.state ?? {}
	const hasFilters = playerId || teamId || position
	const player = playerId ? getPlayer(playerId) : null
	return (
		<div className="flex flex-col justify-center items-center w-full gap-2 mt-5">
			{player && (
				<>
					<div className="text-5xl font-bold w-full mb-3 text-center">
						{player?.firstName + " " + player?.lastName}
					</div>
				</>
			)}

			{(playerId || position || teamId) && (
				<button
					className="absolute right-5 top-5 btn btn-sm btn-error btn-square btn-outline"
					onClick={() => navigation("/", { state: {} })}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			)}

			<div className="flex gap-2 items-center">
				<div className="flex gap-2 my-2">
					{positions.map(p => (
						<div
							key={p}
							className={classNames("btn btn-square btn-secondary", {
								"btn-outline": (player ? player.position : position) !== p,
								"btn-active": (player ? player.position : position) === p,
							})}
							onClick={() =>
								navigation("/", {
									state: {
										...location.state,
										position: p,
										playerId: player?.position === p ? player.code : undefined,
									},
								})
							}
						>
							{p}
						</div>
					))}
				</div>
				<button
					className={classNames("btn btn-sm btn-error btn-square btn-outline", { "btn-disabled": !position })}
					onClick={() => navigation("/", { state: { ...location.state, position: undefined } })}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div className="flex gap-2 items-center">
				<select
					className="select select-info w-full max-w-xs"
					onChange={e =>
						navigation("/", {
							state: {
								...location.state,
								teamId: e.target.value,
								playerId: player?.team === e.target.value ? player.code : undefined,
							},
						})
					}
					value={teamId ? teamId : "-"}
				>
					<option disabled value={"-"}>
						{player ? player.team : "Select Team"}
					</option>
					{getTeams().map(t => (
						<option key={t} value={t}>
							{t}
						</option>
					))}
				</select>
				<button
					className={classNames("btn btn-sm btn-error btn-square btn-outline", { "btn-disabled": !teamId })}
					onClick={() => navigation("/", { state: { ...location.state, teamId: undefined } })}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			{!hasFilters && (
				<div className="p-5">
					<div className="alert alert-info">
						Select filters above or by clicking on a player in the tables below
					</div>
				</div>
			)}

			<div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-5">
				{navigationIcons.map(nav => (
					<a href={nav.href} key={nav.name}>
						<button className="bg-accent rounded p-4">
							<img className="h-20" src={nav.image} alt={nav.name} />
						</button>
					</a>
				))}
			</div>
		</div>
	)
}
