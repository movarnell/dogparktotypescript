import { useEffect } from "react";
import Calendar from "./Calendar";
import { User } from "./User";
import InfoIcon from "./Icons/InfoIcon";
import WarningIcon from "./Icons/WarningIcon";
import {formatDate} from "./utils";
import { sortUsers } from "./utils";

export default function Schedule({
	users,
	deleteUser,
	getUsers,
}: {
	users: User[];
	deleteUser: (userId: any) => void;
	getUsers: () => void;
}) {
	// add useeffect to get users from database
	useEffect(() => {
		getUsers();
	}, []);


	// filter out users that are in the past - at the moment this is not resued anywhere else.
	function getFutureUsers(sortedUsers: User[]) {
		const futureUsers: User[] = [];
		const now = new Date();
		sortedUsers.forEach((user) => {
			const userDate = new Date(user.date);
			if (userDate > now) {
				futureUsers.push(user);
			}
		});
		return futureUsers;
	}

	let sortedUsers = sortUsers(users);
	sortedUsers = sortUsers(getFutureUsers(sortedUsers));



	// return statement with the calendar and the list of all future scheduled users
	return (
		<>
			<div className="container-fluid">
				<div className="row m-3 centerContent">
					<div className="col text-center">
						<div className="calendarFixed">
							<Calendar users={users} />
						</div>
					</div>
					<div className="col title2">
						<h2 className="text-center title2 fw-bolder">Upcoming Schedule</h2>
						{sortedUsers.map((user) => (
							<div
								className="card m-3 shadow border border-1 border-secondary rounded-3"
								key={user.id}
							>
								<div className="card-body">
									<button
										type="button"
										className="btn-close float-end"
										aria-label="Close"
										onClick={() => deleteUser(user.id)}
									></button>
									<h3 className="card-title fw-bold">{user.name}</h3>
									<h5 className="card-title">
										Bringing:<span className="fw-bold"> {user.dogName}</span>
									</h5>
									<h6 className="card-subtitle mb-2">
										{formatDate(user.date)}
									</h6>

									{user.friendly ? (
										<h6 className="alert alert-danger fw-bolder border border-2 border-secondary m-1 p-1">
											{<WarningIcon />}
											This dog is not friendly with either other dogs or people.
										</h6>
									) : (
										""
									)}
									{user.puppy ? (
										<p className="alert alert-success border border-2 border-secondary m-1 p-1">
											{<InfoIcon />} This dog is a puppy. Please be gentle.
										</p>
									) : (
										""
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
