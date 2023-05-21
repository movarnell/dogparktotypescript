
import { format, addHours} from "date-fns";
import { User } from "./User";
import InfoIcon from "./Icons/InfoIcon";
import WarningIcon from "./Icons/WarningIcon";
import { sortUsers } from "./utils";

// Main component for displaying today's schedule
export default function TodaysSchedule({ users, deleteUser }: { users: User[], deleteUser: (userId: any) => void, getUsers: () => void }) {
	// Logging users for debugging purposes
	console.log(users);

	// This function filters the users for today's date
	function todaysUsers(users: User[])
	{
		const today = new Date();
		const todaysUsers: User[] = [];
		users.forEach((user) => {
			const userTime = new Date(user.date);
			if (userTime.getDate() === today.getDate()) {
				todaysUsers.push(user);
			}
		});
		return todaysUsers;
	}
	


	// Getting today's schedule and the users for the next hour
	const todaySchedule = todaysUsers(users);
	const nextHrUsers: User[] = [];
	const nxtHr = addHours(new Date(), 1);
	
	todaySchedule.forEach((user) => {
		const userTime = new Date(user.date);
		if (userTime < nxtHr && userTime > new Date()) {
			nextHrUsers.push(user);
		}
	});

	const usersNxtHrCt = nextHrUsers.length;
	const filteredUsers = sortUsers(todaySchedule);
	const usersNxtHr = sortUsers(nextHrUsers);

	// This function formats the date into a better to read time format
	function formatTime(time: Date) {
		const date: Date = new Date(time);
		return format(date, "h:mm a");
	}


	const now = new Date();

	// This function sorts through the users to pull out the ones in the next hour for the alert. 
	function userNxtHrTime(user: User) {
		const userTime: Date = new Date(user.date);
		const userNxtHr: Date = addHours(userTime, 1);
		if (now > userTime && now < userNxtHr) {
			return true;
		}
	}


	return (
        <>
		<div className="row ms-2 me-2">
			<div className="currentUsers">
                <h2 className="title2 text-center">Today's Dogs</h2>
				<h5 className="title2 text-center">Dogs in Next Hour: {usersNxtHrCt}</h5>
				{todaysUsers(users).length === 0 ? (
					<div className="alert alert-secondary title2 shadow border border-1 border-secondary rounded-3 m-1 p-1 text-center">
						No dogs scheduled for today yet, You should bring your dog!
						</div>) : ("")}
			</div>
			{filteredUsers.map((user) => (
				<div className="col-sm-12 title2">
					<div className="card shadow mt-2 rounded-3" key={user.id}>
						<div className="card-body">
						<button
								type="button"
								className="btn-close float-end"
								aria-label="Close"
								onClick={() => deleteUser(user.id)}
							></button>
							<h5 className="card-title fw-bold">{user.name} is bringing</h5>
							<h5 className="mb-2 fw-bold">{user.dogName}</h5>
							<h6 className="card-text">Today at {formatTime(user.date)}</h6>
							
							{ userNxtHrTime(user) ? (
								<h6 className="alert alert-info title2 border border-2 border-info fw-bold m-1 p-1 text-center">
								{<InfoIcon/>}	Scheduled for now. If you hurry you can still make it!
								</h6>
							) : (
								""
							)}
							
							{user.friendly ? <h6 className="alert alert-danger fw-bolder border border-2 border-secondary m-1 p-1">{<WarningIcon />}
     This dog is not friendly with either other dogs or people. 
								</h6>:('')}

							{usersNxtHr.some((usersNxtHr) => usersNxtHr.id === user.id) ? (
								<p className="alert alert-info border border-2 border-secondary m-1 p-1">
								{<InfoIcon/>}	This dog arrives within the next hour.
								</p>
							) : (
								""
							)}
							{user.puppy ? (
								<p className="alert alert-success border border-2 border-secondary m-1 p-1">
								{<InfoIcon />}	This dog is a puppy. Please be gentle.
								</p>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			))}
								
		</div>
        </>
	);
    
}
