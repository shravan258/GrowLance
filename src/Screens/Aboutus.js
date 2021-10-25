import '../css/Aboutus.css';
import NavbarHome from '../components/Navbar';
import video from '../images/video.mp4';

function AboutUs() {
  return (
    <div>
      <NavbarHome />
      <div className='AboutUs'>
        <div className='container my-4'>
          <link
            rel='stylesheet'
            href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
            integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk'
            crossorigin='anonymous'
          />

          <div className='vi'>
            <video width='100%' loop={true} autoPlay={true} muted={true}>
              <source src={video} type='video/mp4' />
            </video>
          </div>

          <div className='row featurette d-flex justify-content-center align-items-center'>
            <div className='col-md-7'>
              <h2 className='featurette-heading'>GrowLance</h2>
              <p className='lead'>
                <strong>GrowLance</strong> is India's No. 1 Local Search engine
                that provides local search related services to users across
                India through multiple platforms such as website, mobile
                website, Apps (Android, iOS, Windows), over the telephone and
                text (SMS).
              </p>
            </div>
            <div className='col-md-5'>
              <img
                className='img-fluid'
                src='https://growlance.club/static/media/social.2ec972d9.png'
                alt=''
              />
            </div>
          </div>
          <div className='row featurette d-flex justify-content-center align-items-center'>
            <div className='col-md-7 order-md-2'>
              <h2 className='featurette-heading'>Our Initiatives</h2>
              <p className='lead'>
                GrowLance has also initiated ‘Search Plus’ services for its
                users. These services aim at making several day-to-day tasks
                conveniently actionable and accessible to users through one App.
                By doing so, it has transitioned from being purely a provider of
                local search and related information to being an enabler of such
                transactions
              </p>
            </div>
            <div className='col-md-5 order-md-1'>
              <img
                className='img-fluid'
                src='https://www.ezeeserve.com/images/Service-provider/img-service.png'
                alt=''
              />
            </div>
          </div>
          <div className='row featurette d-flex justify-content-center align-items-center'>
            <div className='col-md-7'>
              <h2 className='featurette-heading'>GrowLance's Mission</h2>
              <p className='lead'>
                To provide fast, free, reliable and comprehensive information to
                our users and connect buyers to sellers.
              </p>
            </div>
            <div className='col-md-5'>
              <img
                className='img-fluid'
                src='https://static.startuptalky.com/2021/08/why-service-based-startups-are-successful-in-India_startuptalky-1.jpg'
                alt=''
              />
            </div>
          </div>
        </div>
        {/* <!-- footer --> */}
        <footer className='container'>
          <p className='float-right'>
            <a href='#'>Back to top</a>
          </p>
          <p>
            © 2020-2021 GrowLance, Inc. · <a href='#'>Privacy</a> ·
            <a href='#'>Terms</a>
          </p>
        </footer>
        {/* <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS --> */}
        <script
          src='https://code.jquery.com/jquery-3.5.1.slim.min.js'
          integrity='sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj'
          crossorigin='anonymous'
        ></script>
        <script
          src='https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js'
          integrity='sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo'
          crossorigin='anonymous'
        ></script>
        <script
          src='https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js'
          integrity='sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI'
          crossorigin='anonymous'
        ></script>
      </div>
    </div>
  );
}

export default AboutUs;
