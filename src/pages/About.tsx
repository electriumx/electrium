
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Our Store</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-lg mb-6">
          Welcome to our premium electronics store, where we bring you the latest and greatest in technology and innovation. 
          Founded in 2020, we've quickly established ourselves as a leader in the online retail space for quality electronics and gadgets.
        </p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Our Mission</h2>
        <p className="text-lg mb-6">
          Our mission is to make high-quality electronics accessible to everyone. We believe that technology should enhance your life, 
          not complicate it. That's why we carefully curate our selection of products, ensuring that each item meets our strict standards 
          for quality, performance, and value.
        </p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">What Sets Us Apart</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li className="text-lg">Curated selection of premium products</li>
          <li className="text-lg">Competitive prices on all items</li>
          <li className="text-lg">Exceptional customer service</li>
          <li className="text-lg">Easy returns and exchanges</li>
          <li className="text-lg">Fast shipping options</li>
          <li className="text-lg">Detailed product information and honest reviews</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Our Commitment to Sustainability</h2>
        <p className="text-lg mb-6">
          We are committed to reducing our environmental footprint. Our packaging is made from recyclable materials, 
          and we partner with manufacturers who share our commitment to sustainable practices. We also offer a recycling 
          program for old electronics, ensuring they don't end up in landfills.
        </p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Customer Satisfaction</h2>
        <p className="text-lg mb-6">
          Your satisfaction is our top priority. If you're not completely happy with your purchase, our friendly customer 
          service team is here to help. We stand behind every product we sell and are committed to making things right if 
          something goes wrong.
        </p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Join Our Community</h2>
        <p className="text-lg mb-6">
          Beyond being just an online store, we're building a community of tech enthusiasts. Follow us on social media to 
          stay up-to-date on the latest product releases, tech news, and exclusive promotions. We also welcome your feedback 
          and suggestions – they help us improve and serve you better.
        </p>
        
        <p className="text-lg mb-6">
          Thank you for choosing us as your electronics destination. We look forward to helping you find the perfect products 
          to enhance your digital life.
        </p>
      </div>
    </div>
  );
};

export default About;
