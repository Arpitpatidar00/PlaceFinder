import React, { useEffect } from "react";
import "./feturedplaces.css";

export default function Featured() {
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            } else {
              entry.target.classList.remove("visible");
            }
          });
        },
        { threshold: 0.1 } // Trigger when 10% of the element is visible
      );
  
      // Select both .featured and .place-content elements
      const featuredElements = document.querySelectorAll(".featured, .place-content");
      featuredElements.forEach((element) => observer.observe(element));
  
      return () => {
        featuredElements.forEach((element) => observer.unobserve(element));
      };
    }, []);
  
    return (
      <div>
      {/* First featured place: Panchmarhi */}
      <div className="featured">
        <div className="featured-places1"></div>
        <div className="place-content">
          <h1>Panchmarhi</h1>
          <h2>The Queen of Satpura</h2>
          <p>
            Nestled in the heart of Madhya Pradesh, Panchmarhi is a serene hill station renowned for its breathtaking landscapes and rich biodiversity. This picturesque destination is characterized by lush green valleys, cascading waterfalls, and ancient caves adorned with exquisite rock paintings. Panchmarhi serves as a tranquil retreat for nature enthusiasts and adventure seekers alike.
            <br /><br />
            The town is dotted with several attractions, including the stunning Bee Falls, which is an ideal spot for picnics and relaxation. The ancient Pandav Caves, believed to have been carved during the 1st century BCE, offer a glimpse into the region's historical significance. These rock-cut caves feature intricate sculptures and provide a fascinating insight into the lives of the Pandavas from the Mahabharata.
            <br /><br />
            Additionally, the breathtaking viewpoints, such as Dhoopgarh, the highest point in Madhya Pradesh, offer panoramic views of the Satpura range, making it a popular destination for sunrise and sunset enthusiasts. Panchmarhi’s pleasant climate, combined with its natural beauty, makes it a must-visit destination for travelers seeking peace and adventure.
          </p>
        </div>
      </div>
    
      {/* Second featured place: Chittorgarh Fort */}
      <div className="featured">
        <div className="place-content">
          <h1>Chittorgarh Fort</h1>
          <h2>A Testament to Valor and Bravery</h2>
          <p>
            Standing as a symbol of Rajput valor and heritage, Chittorgarh Fort is one of the largest forts in India and a UNESCO World Heritage Site. This majestic fortress, perched atop a hill, boasts a rich history that echoes the tales of bravery and sacrifice from the times of the Rajputs. It spans over 700 acres and is surrounded by a series of massive walls and gateways.
            <br /><br />
            The fort is home to several remarkable structures, including the iconic Vijay Stambh (Tower of Victory) and the Kirti Stambh (Tower of Fame), which showcase exquisite Rajput architecture. The fort also houses numerous palaces, temples, and reservoirs, each with its unique history and architectural grandeur.
            <br /><br />
            Among its many legends, the story of Rani Padmini stands out, illustrating the courage of the Rajput queens. Visitors can explore the pristine beauty of the fort and experience its historical significance through guided tours. The fort’s sprawling landscape, with its intricately carved palaces and stunning water bodies, provides a mesmerizing glimpse into the royal heritage of Rajasthan. A visit to Chittorgarh Fort is not just a journey through history but a tribute to the indomitable spirit of its people.
          </p>
        </div>
        <div className="featured-places2"></div>
      </div>
    </div>
    
    
    );
  }