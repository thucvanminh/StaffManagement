import React from 'react';

import styles from './EmployeeForm.module.css';

export default function EmployeeForm() {
    return (
        <form className={styles.employeeForm}>
            <label>Employee Name:</label>
            <input type="text" name="name" />
            <label>DOB:</label>
            <input type="date" name="dob" />
            <label>Address:</label>
            <input type="text" name="address" />
            <label>Phone Number:</label>
            <input type="text" name="phone" />
            <label>Gender:</label>
            <select name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <label>Email:</label>
            <input type="email" name="email" />
            <button type="submit">Save</button>
            <button type="reset">Cancel</button>
        </form>
    );
}