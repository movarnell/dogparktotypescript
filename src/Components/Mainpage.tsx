import React from "react";
import TodaysSchedule from "./TodaysSchedule";
import Entry from "./Entry";
import { User } from "./User";

export default function Mainpage(
        { users, createUser, deleteUser, getUsers, setUsers }: {
                users: User[],
                createUser: (data: any) => void,
                deleteUser: (userId: number) => void,
                getUsers: () => void,
                setUsers: (users: User[]) => void,
        }) {
                

	return (
		<>
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-6 col-sm-12">
						<Entry
							users={users}
							createUser={createUser}
							getUsers={getUsers}
							setUsers={setUsers}
						/>
					</div>
					<div className="col-md-6 col-sm-12">
						<TodaysSchedule users={users} deleteUser={deleteUser} />
					</div>
				</div>
			</div>
		</>
	);
}
