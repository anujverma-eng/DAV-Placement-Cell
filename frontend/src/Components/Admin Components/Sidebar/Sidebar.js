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
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const liveJobs = () => {
        navigate('/admin/jobs/live', { replace: true });
    };
    const pendingJobs = () => {
        navigate('/admin/jobs/pending', { replace: true });
    };
    const mustDeleteJobs = () => {
        navigate('/admin/jobs/must/delete', { replace: true });
    };
    const selectionStatus = () => {
        navigate('/admin/student/selection', { replace: true });
    };
    const allStudents = () => {
        navigate('/admin/student/all', { replace: true });
    };


    const drawer = (
        <div>
            <Toolbar />
            <Typography variant="h6" style={{ padding: "10px 20px" }} ><Link to="/" style={{ textDecoration: "none" }}>Placement Cell</Link></Typography>
            <Divider />
            <List>
                <ListItemButton onClick={liveJobs}>
                    <ListItemIcon> <InboxIcon /> </ListItemIcon>
                    <ListItemText primary="Live Jobs" />
                </ListItemButton>
                <ListItemButton onClick={pendingJobs}>
                    <ListItemIcon> <InboxIcon /> </ListItemIcon>
                    <ListItemText primary="Pending Jobs" />
                </ListItemButton>
                <ListItemButton onClick={mustDeleteJobs}>
                    <ListItemIcon> <InboxIcon /> </ListItemIcon>
                    <ListItemText primary="Must Delete Jobs" />
                </ListItemButton>
            </List>
            <Divider />
            <List>
                <ListItemButton onClick={allStudents}>
                    <ListItemIcon> <InboxIcon /> </ListItemIcon>
                    <ListItemText primary="All Students" />
                </ListItemButton>
                <ListItemButton onClick={selectionStatus}>
                    <ListItemIcon> <InboxIcon /> </ListItemIcon>
                    <ListItemText primary="Selection Status" />
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
                <div>
                    <div className="row">
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-start-primary py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-primary fw-bold text-xs mb-1"><span>Live jobs</span></div>
                                            <div className="text-dark fw-bold h5 mb-0"><span>330</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-broadcast-tower fa-2x text-gray-300" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-start-success py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-success fw-bold text-xs mb-1"><span>Total students</span></div>
                                            <div className="text-dark fw-bold h5 mb-0"><span>1156</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-user-graduate fa-2x text-gray-300" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-start-info py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-info fw-bold text-xs mb-1"><span>Total applied</span></div>
                                            <div className="text-dark fw-bold h5 mb-0 me-3"><span>1089</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-diagnoses fa-2x text-gray-300" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-3 mb-4">
                            <div className="card shadow border-start-warning py-2">
                                <div className="card-body">
                                    <div className="row align-items-center no-gutters">
                                        <div className="col me-2">
                                            <div className="text-uppercase text-warning fw-bold text-xs mb-1"><span>Pending approvals</span></div>
                                            <div className="text-dark fw-bold h5 mb-0"><span>63</span></div>
                                        </div>
                                        <div className="col-auto"><i className="fas fa-stopwatch fa-2x text-gray-300" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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