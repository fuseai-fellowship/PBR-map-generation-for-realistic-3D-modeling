import React,{useEffect}from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../Components';
import HeroSection from '../Components/HeroSection';
import FeatureCard from '../Components/FeatureCard';
import ProcessStep from '../Components/ProcessStep';
import { useAssetContext } from '../Components/AssetContext';

const NewLandingPage = () => {
  const {updateNoOfCamera}=useAssetContext();

    useEffect(() => {
      async function checkCameras() {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = devices.filter(device => device.kind === 'videoinput');
        // console.log("Video Inputs are ", videoInputs)
      
        if (videoInputs.length > 1) {
          updateNoOfCamera(true)
        }
      }
  
      checkCameras();
    }, []);
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Why Choose Our PBR Texture Converter */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Why Choose Our PBR Texture Converter?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Advanced technology paired with a simple interface makes PBR Mapper the preferred choice for professionals and beginners alike.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to='/stream'>
            <FeatureCard 
              title="AI-Driven Precision" 
              description="Generate accurate Albedo, Normal, Roughness, Metalness, and other PBR maps effortlessly." 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>}
            />
            </Link>

            <FeatureCard 
              title="Seamless Workflow" 
              description="Upload an image, select texture preferences, and download optimized PBR materials instantly." 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>}
            />
            <FeatureCard 
              title="Game & VFX Ready" 
              description="Designed for industry professionals, ensuring compatibility with Blender, Unreal Engine, Unity, and more." 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
            />
            <FeatureCard 
              title="No Design Experience Needed" 
              description="Simplified UI makes it easy for artists, developers, and beginners to create stunning textures." 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>}
            />
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-[#e9f5ec] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-texture-pattern"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Three simple steps to transform any image into professional PBR textures
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-10">
              <ProcessStep 
                number="1" 
                title="Upload Your Image" 
                description="Drag and drop or select an image to process. Support for JPG, PNG, and more formats up to 8K resolution." 
              />
              <ProcessStep 
                number="2" 
                title="AI Analyzes & Converts" 
                description="Our model extracts material properties to generate realistic texture maps including normal, roughness, displacement, and more." 
              />
              <ProcessStep 
                number="3" 
                title="Download & Apply" 
                description="Export your PBR textures in various formats and integrate them into your 3D projects. Choose from multiple resolution options." 
                isLast 
              />
            </div>
            
            <div className="mt-12 text-center">
              {/* <Button className="bg-mapper-primary hover:bg-mapper-dark text-white px-8 py-6 h-auto text-lg">
                Start Converting Textures
              </Button> */}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-mapper-primary to-mapper-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Textures?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Join thousands of artists and developers who have streamlined their workflow with our AI-powered texture conversion tool.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {/* <Button className="bg-white text-mapper-primary hover:bg-gray-100 px-8 py-6 h-auto text-lg">
              Get Started Free
            </Button> */}
            {/* <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 h-auto text-lg">
              View Pricing
            </Button> */}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">PBR Mapper</h3>
              <p className="mb-4">
                The leading AI-powered texture conversion tool for game developers, 3D artists, and designers.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Discord</a>
                <a href="#" className="hover:text-white transition-colors">YouTube</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Contact Us</h4>
              <p className="mb-2">Have questions or feedback?</p>
              <a href="mailto:sh.niharika08@gmail.com" className="text-mapper-accent hover:text-white transition-colors">
                sh.niharika08@gmail.com
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>© 2025 Mapper. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewLandingPage;