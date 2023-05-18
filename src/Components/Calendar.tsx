
import '../../node_modules/react-day-picker/dist/style.css';
import { DayPicker } from 'react-day-picker';
import { User } from './User';

export default function Calendar({users}:{ users: User[]}) {
function getUniqueDates(users: User[]) {
    // Create an array to store only unique dates
    const uniqueDates: Date[] = [];

    // Loop over the users array, and for each user, check if the date is already in the array
    users.forEach((user: User) => {
        const userDate = new Date(user.date);
        // If the date is not in the array, add it to the array
        if (!uniqueDates.includes(userDate)) {
            uniqueDates.push(userDate);
        }
    });

    // Return the array of unique dates
    return uniqueDates;
}

// Call the getUniqueDates function and store the returned array in the variable uniqueDates
let uniqueDates = getUniqueDates(users);

// Create a footer for the calendar
const footer = (<p className='footer'>*Dates in blue have dogs scheduled</p>)


return (
    <> 
        <h2 className='fw-bolder title2'>Scheduled Dogs</h2>
          <DayPicker
            className= 'title2 fw-bold'
            selected={uniqueDates.map(date => new Date(date))}
            footer={footer}
          />
    </>
  );
  
  
}

