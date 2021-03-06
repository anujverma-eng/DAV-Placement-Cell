import React from 'react';
import './Sidebar.css';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PendingActionsRoundedIcon from '@mui/icons-material/PendingActionsRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import MoreTimeRoundedIcon from '@mui/icons-material/MoreTimeRounded';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';

const drawerWidth = 240;

const Sidebar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const liveJobs = () => {
        navigate('/admin/dashboard', { replace: true });
    };
    const pendingJobs = () => {
        navigate('/admin/jobs/pending', { replace: true });
    };
    const mustDeleteJobs = () => {
        navigate('/admin/jobs/must/delete', { replace: true });
    };
    const selectionStatus = () => {
        navigate('/admin/selection', { replace: true });
    };
    const allStudents = () => {
        navigate('/admin/students/all', { replace: true });
    };
    const selectedStudents = () => {
        navigate('/admin/students/selected', { replace: true });
    };
    const notSelectedStudents = () => {
        navigate('/admin/students/notSelected', { replace: true });
    };
    const whoApplied = () => {
        navigate('/admin/get/candidates', { replace: true });
    };


    const drawer = (
        <div>
            <Toolbar />
            <Typography variant="h6" style={{ padding: "10px 20px" }} ><Link to="/" style={{ textDecoration: "none" }}>Placement Cell</Link></Typography>
            <Divider />
            <List>
                <ListItemButton onClick={liveJobs}>
                    <ListItemIcon> <DashboardRoundedIcon /> </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton onClick={pendingJobs}>
                    <ListItemIcon> <PendingActionsRoundedIcon /> </ListItemIcon>
                    <ListItemText primary="Pending Jobs" />
                </ListItemButton>
                <ListItemButton onClick={mustDeleteJobs}>
                    <ListItemIcon> <DeleteForeverRoundedIcon /> </ListItemIcon>
                    <ListItemText primary="Must Delete Jobs" />
                </ListItemButton>
                <ListItemButton onClick={whoApplied}>
                    <ListItemIcon> <PersonSearchRoundedIcon /> </ListItemIcon>
                    <ListItemText primary="Get Candidates" />
                </ListItemButton>
            </List>
            <Divider />
            <List>
                <ListItemButton onClick={allStudents}>
                    <ListItemIcon> <GroupAddRoundedIcon /> </ListItemIcon>
                    <ListItemText primary="All Students" />
                </ListItemButton>
                <ListItemButton onClick={selectionStatus}>
                    <ListItemIcon> <MoreTimeRoundedIcon /> </ListItemIcon>
                    <ListItemText primary="Pending Selections" />
                </ListItemButton>
                <ListItemButton onClick={selectedStudents}>
                    <ListItemIcon> <DoneAllRoundedIcon /> </ListItemIcon>
                    <ListItemText primary="Selected Students" />
                </ListItemButton>
                <ListItemButton onClick={notSelectedStudents}>
                    <ListItemIcon> <InboxIcon /> </ListItemIcon>
                    <ListItemText primary="Not Selected" />
                </ListItemButton>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                style={{ zIndex: 50 }}
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Placement Cell, Admin Panel
                    </Typography>
                </Toolbar>
            </AppBar>


            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {props.element}

            </Box>
        </Box>
    );
};
Sidebar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
export default Sidebar;