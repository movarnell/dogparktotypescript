import { User } from "./User";
import { format } from "date-fns";


	// This function sorts users by date
	export function sortUsers(users: User[]) {
		const sortedUsers = users.sort((a, b) => {
			const aTime: any = new Date(a.date);
			const bTime: any = new Date(b.date);
			return aTime - bTime;
		});
		return sortedUsers;
	}

   export function formatDate(date: Date) {
		const dateObj = new Date(date);
		const formattedDate = format(dateObj, "MM/dd/yyyy h:mm a");
		return formattedDate;
	}