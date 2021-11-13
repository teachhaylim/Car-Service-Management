import { QueryAppointment } from 'api/appointment.api';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';

const DashboardPersonal = () => {
    useEffect(() => {
        QueryAppointment({ bd: "2021-11-01", ed: "2021-11-10" })
            .then(res => {
                if (res.meta === 200) {
                    console.log(res);
                    return;
                }

                toast.error("Query Error");
            })
            .catch(err => {
                toast.error(`Query Error - ${err.message}`);
            })
    }, []);

    return (
        <div>
            Dashboard Personal
        </div>
    )
}

export default DashboardPersonal
