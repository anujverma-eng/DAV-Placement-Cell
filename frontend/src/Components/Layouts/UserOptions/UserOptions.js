import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../actions/studentAction';
import { useAlert } from 'react-alert';
import './UserOption.css';


const UserOptions = ({ student, isAuthenticated, error }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const alert = useAlert();

    const applied = () => {
        navigate('/myApplied', { replace: true });
    };
    const account = () => {
        navigate('/account', { replace: true });
    };
    const logoutMe = (e) => {
        if (error) {
            alert.error(error);
        }
        if (isAuthenticated) {
            alert.success("You have Logged Out Successfully.");
            navigate('/login', { replace: true });
            dispatch(logout());
        }
    };
    const dashboard = () => {
        navigate('/admin/dashboard', { replace: true });
        navigate('/admin/dashboard', { replace: true });
    };

    const options = [
        { icon: <AccountCircleIcon />, name: "Profile", func: account },
        { icon: <LogoutIcon />, name: "Logout", func: logoutMe }
    ];

    if (student.role === "admin") {
        options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard });
    } else {
        options.unshift({ icon: <ListAltIcon />, name: "Job Applied", func: applied });
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                className='speedDial'
                ariaLabel='Profile Dialer'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                icon={
                    <img className='speedDialIcon' src={student.avatar.url ? student.avatar.url : '/Profile.png'} alt="Profile" />
                }
            >

                {options.map((item) => (
                    <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
                ))}

            </SpeedDial>
        </Fragment>
    );
};

export default UserOptions;