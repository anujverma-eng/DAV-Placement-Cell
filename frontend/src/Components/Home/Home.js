import React, { Fragment, useEffect } from 'react';
import JobComponent from './JobComponent';
import Metadata from '../Layouts/Metadata';
import { clearErrors, getAllJobs } from '../../actions/jobAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Layouts/Loader/Loader';
import { useAlert } from 'react-alert';
import './Home.css';


const Home = () => {

    const alert = useAlert();

    const dispatch = useDispatch();

    const { loading, error, jobs, jobsCount } = useSelector((state) => state.jobReducer);
    const { isAuthenticated } = useSelector((state) => state.studentReducer);
    useEffect(() => {
        if (error) {
            alert.error(error);
            return dispatch(clearErrors);
        }
        dispatch(getAllJobs(isAuthenticated));

    }, [dispatch, error, alert, isAuthenticated]);


    return (
        <Fragment >
            {loading ? <Loader /> :
                <Fragment >
                    <Metadata title="D.A.V. Placement Cell" />

                    <header style={{ paddingTop: 62 }}>
                        <div className="carousel slide carousel-fade" data-bs-ride="carousel" id="carousel-1" style={{ height: 600 }}>
                            <div className="carousel-inner h-100">
                                <div className="carousel-item active h-100"><img alt="pics" className="img-fluid w-100 d-block position-absolute h-100 fit-cover" src="slide-5.jpg" style={{ zIndex: -1 }} />
                                    <div className="container d-flex flex-column justify-content-center h-100">
                                        <div className="row">
                                            <div className="col-md-6 col-xl-4 offset-md-2">
                                                <div style={{ maxWidth: 350 }}>
                                                    <h1 className="text-uppercase fw-bold text-white">D.A.V College, Jalandhar</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item h-100"><img alt="pics" className="w-100 d-block position-absolute h-100 fit-cover" src="slide-2.png" style={{ zIndex: -1 }} />
                                    <div className="container d-flex flex-column justify-content-center h-100">
                                        <div className="row">
                                            <div className="col-md-6 col-xl-4 offset-md-2">
                                                <div style={{ maxWidth: 350 }}>
                                                    <h1 className="text-uppercase fw-bold">Biben dum<br />fringi dictum, augue purus</h1>
                                                    <p className="my-3">Tincidunt laoreet leo, adipiscing taciti tempor. Primis senectus sapien, risus donec ad fusce augue interdum.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item h-100"><img alt="pics" className="w-100 d-block position-absolute h-100 fit-cover" src="slide-4.jpg" style={{ zIndex: -1 }} />
                                    <div className="container d-flex flex-column justify-content-center h-100">
                                        <div className="row">
                                            <div className="col-md-6 col-xl-4 offset-md-2">
                                                <div style={{ maxWidth: 350 }}>
                                                    <h1 className="text-uppercase fw-bold">Biben dum<br />fringi dictum, augue purus</h1>
                                                    <p className="my-3">Tincidunt laoreet leo, adipiscing taciti tempor. Primis senectus sapien, risus donec ad fusce augue interdum.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item h-100"><img alt="pics" className="w-100 d-block position-absolute h-100 fit-cover" src="slide-6.jpg" style={{ zIndex: -1 }} />
                                    <div className="container d-flex flex-column justify-content-center h-100">
                                        <div className="row">
                                            <div className="col-md-6 col-xl-4 offset-md-2">
                                                <div style={{ maxWidth: 350 }}>
                                                    <h1 className="text-uppercase fw-bold">Biben dum<br />fringi dictum, augue purus</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div><a className="carousel-control-prev" href="#carousel-1" role="button" data-bs-slide="prev"><span className="carousel-control-prev-icon" /><span className="visually-hidden">Previous</span></a><a className="carousel-control-next" href="#carousel-1" role="button" data-bs-slide="next"><span className="carousel-control-next-icon" /><span className="visually-hidden">Next</span></a></div>
                            <ol className="carousel-indicators">
                                <li data-bs-target="#carousel-1" data-bs-slide-to={0} className="active" />
                                <li data-bs-target="#carousel-1" data-bs-slide-to={1} />
                                <li data-bs-target="#carousel-1" data-bs-slide-to={2} />
                                <li data-bs-target="#carousel-1" data-bs-slide-to={3} />
                            </ol>
                        </div>
                    </header>
                    <section>
                        <section className="py-4 py-xl-5">
                            <div className="container">
                                <div className="bg-dark border rounded border-0 border-dark overflow-hidden" style={{ height: '350.075px' }}>
                                    <div className="row g-0">
                                        <div className="col-md-6" style={{ background: 'linear-gradient(#e92424, #470606), var(--bs-red)' }}>
                                            <div className="text-white p-4 p-md-5">
                                                <h2 className="fw-bold text-white mb-3" style={{ textShadow: '1px 1px 1px rgb(65,2,2)' }}>PLACEMENT&nbsp;CELL<br /></h2>
                                                <p className="mb-4">The Motto of Placement Cell is loud and clear – “Hey students! You are assets, the higher you go, the higher goes your alma-mater!”<br /></p>
                                                <div className="my-3">
                                                    <p className="text-dark"><br /><strong>The Training and Placement cell provides support for placement of Final year students of&nbsp;UG&nbsp;and PG Classes</strong><br /><br /></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 order-md-last d-none d-md-block" style={{ minHeight: 250 }}><img alt="pics" className="w-100 h-75 fit-cover" src="slide-7.png" /></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                    <section className="d-none d-md-block">
                        <div className="carousel slide" data-bs-ride="carousel" id="carousel-2">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="container" style={{ paddingRight: 20, paddingLeft: 20 }}>
                                        <div className="row" style={{ marginRight: 0, marginLeft: 0, paddingRight: 10, paddingLeft: 10 }}>
                                            <div className="col-md-3 text-center"><img alt="pics" className="img-fluid w-50 h-50" src="Concentrix.png" width="150px" height="auto" /></div>
                                            <div className="col-md-3 text-center"><img alt="pics" className="img-fluid w-50 h-50" src="Lavya-Associates.jpg" width="150px" height="auto" /></div>
                                            <div className="col-md-3 text-center"><img alt="pics" className="img-fluid w-50 h-50" src="TCS.png" width="150px" height="auto" /></div>
                                            <div className="col text-center"><img alt="pics" className="img-fluid w-50 h-50" src="wipro.png" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="container" style={{ paddingRight: 20, paddingLeft: 20 }}>
                                        <div className="row" style={{ marginRight: 0, marginLeft: 0, paddingRight: 10, paddingLeft: 10 }}>
                                            <div className="col-md-3"><img alt="pics" className="img-fluid w-50 h-50" src="Concentrix.png" width="150px" height="auto" /></div>
                                            <div className="col-md-3"><img alt="pics" className="img-fluid w-50 h-50" src="Lavya-Associates.jpg" width="150px" height="auto" /></div>
                                            <div className="col-md-3"><img alt="pics" className="img-fluid w-50 h-50" src="TCS.png" width="150px" height="auto" /></div>
                                            <div className="col"><img alt="pics" className="img-fluid w-50 h-50" src="wipro.png" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="container" style={{ paddingRight: 20, paddingLeft: 20 }}>
                                        <div className="row" style={{ marginRight: 0, marginLeft: 0, paddingRight: 10, paddingLeft: 10 }}>
                                            <div className="col-md-3"><img alt="pics" className="img-fluid w-50 h-50" src="Concentrix.png" width="150px" height="auto" /></div>
                                            <div className="col-md-3"><img alt="pics" className="img-fluid w-50 h-50" src="Lavya-Associates.jpg" width="150px" height="auto" /></div>
                                            <div className="col-md-3"><img alt="pics" className="img-fluid w-50 h-50" src="TCS.png" width="150px" height="auto" /></div>
                                            <div className="col"><img alt="pics" className="img-fluid w-50 h-50" src="wipro.png" /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="container" style={{ paddingRight: 20, paddingLeft: 20 }}>
                                        <div className="row" style={{ marginRight: 0, marginLeft: 0, paddingRight: 10, paddingLeft: 10 }}>
                                            <div className="col-md-3"><img alt="pics" className="img-fluid w-50 h-50" src="Concentrix.png" width="150px" height="auto" /></div>
                                            <div className="col-md-3"><img alt="pics" className="img-fluid w-50 h-50" src="Lavya-Associates.jpg" width="150px" height="auto" /></div>
                                            <div className="col-md-3"><img alt="pics" className="img-fluid w-50 h-50" src="TCS.png" width="150px" height="auto" /></div>
                                            <div className="col"><img alt="pics" className="img-fluid w-50 h-50" src="wipro.png" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="container">
                        <div>
                            <div className="row justify-content-center align-items-center">
                                {jobs && jobs.map((job) => {
                                    const lastDateToApply = new Date(job.lastDateToApply).toDateString();
                                    return (<JobComponent job={job} key={job._id} lastDateToApply={lastDateToApply} />);
                                })}

                            </div>
                        </div>
                    </div>
                    <section>
                        <div className="container">
                            <div className="row" style={{ background: 'var(--bs-gray-300)' }}>
                                <div className="col" style={{ boxShadow: '1px 1px 1px 1px rgb(205,205,205)', borderWidth: 1, background: 'var(--bs-warning)' }}>
                                    <h1 className="text-center text-primary">52</h1>
                                    <p className="text-center text-muted">No. of Companies Visited</p>
                                </div>
                                <div className="col" style={{ boxShadow: '1px 1px 1px 1px rgb(205,205,205)', borderWidth: 1, background: 'var(--bs-gray-400)' }}>
                                    <h1 className="text-center text-primary">52</h1>
                                    <p className="text-center text-muted">No. of Companies Visited</p>
                                </div>
                                <div className="col" style={{ boxShadow: '1px 1px 1px 1px rgb(205,205,205)', borderWidth: 1, background: 'var(--bs-warning)' }}>
                                    <h1 className="text-center text-primary">52</h1>
                                    <p className="text-center text-muted">No. of Companies Visited</p>
                                </div>
                                <div className="col" style={{ boxShadow: '1px 1px 1px 1px rgb(205,205,205)', borderWidth: 1, background: 'var(--bs-gray-400)' }}>
                                    <h1 className="text-center text-primary">52</h1>
                                    <p className="text-center text-muted">No. of Companies Visited</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="card-section-imagia">
                        <h1>Our team</h1>
                        <h2>Website developed by team</h2>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-sm-6 col-md-4">
                                    <div className="card-container-imagia">
                                        <div className="card-imagia">
                                            <div className="front-imagia">
                                                <div className="cover-imagia"><img alt="pincs" src="https://unsplash.it/720/500?image=1067" /></div>
                                                <div className="user-imagia"><img alt="pics" className="img-circle" src="profile.jpg" /></div>
                                                <div className="content-imagia">
                                                    <h3 className="name-imagia">Anuj Verma</h3>
                                                    <p className="subtitle-imagia">Developer</p>
                                                    <p className="text-center"><em>Tantum autem cuique tribuendum, primum quantum ipse efficere possis, deinde etiam quantum ille quem diligas atque adiuves.</em></p>
                                                </div>
                                                <div className="footer-imagia"><span><i className="fa fa-plus" /> More info</span></div>
                                            </div>
                                            <div className="back-imagia">
                                                <div className="content-imagia content-back-imagia">
                                                    <div>
                                                        <h3 className="text-center">Lorem Ipsum</h3>
                                                        <p className="text-center">Et hanc quidem praeter oppida multa duae civitates exornant Seleucia opus Seleuci regis, et Claudiopolis quam deduxit coloniam Claudius Caesar. Isaura enim antehac nimium potens, olim subversa ut rebellatrix interneciva aegre vestigia claritudinis pristinae monstrat admodum pauca. </p>
                                                    </div>
                                                </div>
                                                <div className="footer-imagia">
                                                    <div className="social-imagia text-center"><a href="/"><i className="fa fa-facebook" /></a><a href="/"><i className="fa fa-linkedin" /></a><a href="/"><i className="fa fa-twitter" /></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-4">
                                    <div className="card-container-imagia">
                                        <div className="card-imagia">
                                            <div className="front-imagia">
                                                <div className="cover-imagia cover-gradient" />
                                                <div className="user-imagia"><img alt="pics" className="img-circle" src="https://unsplash.it/120/120?image=64" /></div>
                                                <div className="content-imagia">
                                                    <h3 className="name-imagia">Gurjeet Singh</h3>
                                                    <p className="subtitle-imagia">Designer</p>
                                                    <p className="text-center"><em>Tantum autem cuique tribuendum, primum quantum ipse efficere possis, deinde etiam quantum ille quem diligas atque adiuves. </em></p>
                                                </div>
                                                <div className="footer-imagia"><span><i className="fa fa-plus" /> More info</span></div>
                                            </div>
                                            <div className="back-imagia">
                                                <div className="content-imagia content-back-imagia">
                                                    <div>
                                                        <h3 className="text-center">Lorem Ipsum</h3>
                                                        <p className="text-center">Et hanc quidem praeter oppida multa duae civitates exornant Seleucia opus Seleuci regis, et Claudiopolis quam deduxit coloniam Claudius Caesar. Isaura enim antehac nimium potens, olim subversa ut rebellatrix interneciva aegre vestigia claritudinis pristinae monstrat admodum pauca. </p>
                                                    </div>
                                                </div>
                                                <div className="footer-imagia">
                                                    <div className="social-imagia text-center"><a href="/"><i className="fa fa-facebook" /></a><a href="/"><i className="fa fa-linkedin" /></a><a href="/"><i className="fa fa-twitter" /></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="section-timeline">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h2 className="section-heading">About </h2>
                                    <h3 className="section-subheading text-muted">D.A.V. College, Jalandhar</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <ul className="list-group timeline">
                                        <li className="list-group-item">
                                            <div className="timeline-image"><img alt="pics" className="rounded-circle img-fluid" src="1.jpg" /></div>
                                            <div className="timeline-panel">
                                                <div className="timeline-heading">
                                                    <h4>1918<br /></h4>
                                                    <h4 className="subheading">Our Humble Beginnings </h4>
                                                </div>
                                                <div className="timeline-body">
                                                    <p className="text-muted">D.A.V. College is a private aided college based in Jalandhar, Punjab, India. It was founded in 1918 by Pt.Mehar Chand.</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item timeline-inverted">
                                            <div className="timeline-image"><img alt="pics" className="rounded-circle img-fluid" src="2.jpg" /></div>
                                            <div className="timeline-panel">
                                                <div className="timeline-heading">
                                                    <h4>Vision</h4>
                                                    <h4 className="subheading" />
                                                </div>
                                                <div className="timeline-body">
                                                    <p className="text-muted">To make India an intellectually formidable power house by creating a cadre of motivated and prospective individuals who become catalysts of change through education which is value and need based and which is also globally relevant, yet rooted in the matrix of Indian philosophy.</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="timeline-image"><img alt="pics" className="rounded-circle img-fluid" src="3.jpg" /></div>
                                            <div className="timeline-panel">
                                                <div className="timeline-heading">
                                                    <h4>Mission</h4>
                                                </div>
                                                <div className="timeline-body">
                                                    <p className="text-muted">To create a progressive and creative model of life-long learning, teaching, evaluation and research which is totally in gear with the needs of industry, commerce and public sector, which is also sensitive to Regional, National and International Aspiration, and which is in perfect Rythm with the vedic wisdom and the modern scientific temper.</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item timeline-inverted">
                                            <div className="timeline-image"><img alt="pics" className="rounded-circle img-fluid" src="4.jpg" /></div>
                                            <div className="timeline-panel">
                                                <div className="timeline-heading">
                                                    <h4>Objective</h4>
                                                </div>
                                                <div className="timeline-body">
                                                    <p className="text-muted">To impart quality education in Science. Humanities, Commerce and Media Studies. To mould students into rational thinkers, competent workers and socially aware citizens. To sensitise the students towards inclusive social concerns, human rights and environmental issues. To uphold and arnalgamate Vedic values and propagate the message and teachings of Swami Dayanand and the modern scientific thinking.</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item timeline-inverted">
                                            <div className="timeline-image">
                                                <h4>Be Part Of Our Story!</h4>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>


                </Fragment>
            }


        </Fragment>
    );
};

export default Home;