import Logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <footer className="flex-c w-[100%] primary-c justify-between px-14 text-amber-50">
      <section className="footer-details flex pt-4 pb-8 relative">
        
        {/* Left: Address */}
        
            <div className="flex justify-between absolute top-4 left-0">  
              <a href="https://www.humanrightsfirst.org/">
                <img className="w-[100px]" src={Logo} alt="HRF logo white" />
              </a>
            </div>
          
            <div className="footer-address flex-c-1 pt4">
              <p>Human Rights First</p>
              <p>75 Broad Str, 31st Floor</p>
              <p>New York, New York 10004 US</p>
              <p className="pt-4">For Media Inquiries call 202-370-333 </p>
            </div>
           </section>
        

        {/* Right: Links */}
        <nav className="footer-links flex gap-10 content-center justify-center pb-4">
          <button className='nav-btn'>About Us</button>
          <button className='nav-btn'>Contact Us</button>
          <button className='nav-btn'>Press</button>
          <button className='nav-btn'>Terms & Privacy</button>
          <button className='nav-btn'>Sign Up</button>
          <button className='nav-btn'>Careers</button>
        </nav>

       {/* This was missing - closes max-w-6xl div */}
    </footer>
  ); 
}