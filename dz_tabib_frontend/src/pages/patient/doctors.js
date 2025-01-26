export const doctors = [
    {
      id: 1,
      name: "Karima Boulasbaa",
      specialization: "Cardiologist",
      location: "Rue Mohamed Boudiaf, Ferdjioua, Mila",
      fees: 400,
      rating: 4.5,
      reviews: 1821,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEry1FIDXr2v6ZEvWOn0PgOjsbsthO06JsA&s",
      availability: {
        "2025-01-30": ["08:00 AM"],
        "2025-01-31": ["08:00 AM", "10:00 AM", "02:00 PM"],
        "2025-02-04": ["08:00 AM", "10:00 AM", "02:00 PM"]
      },
      insurance: ["CNA", "AXA", "Allianz"],
      description: "Dr. Karima Boulasbaa is a highly experienced cardiologist with a deep knowledge of heart health. She has been practicing for over 15 years and is known for her thorough approach to patient care.",
      lat: 36.45, // Example latitude
      lon: 6.10,  // Example longitude
    },
    {
      id: 2,
      name: "Louiza Boulasbaa",
      specialization: "Dermatologist",
      location: "Rue Ahmed Toufik, Algiers",
      fees: 300,
      rating: 4.8,
      reviews: 1024,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbnYZ2v6ZEvWOn0PgOjsbsthO06JsA&s",
      availability: {
        "2024-12-28": ["08:00 AM"],
        "2025-02-06": ["08:00 AM", "10:00 AM", "02:00 PM"]
      },
      insurance: ["CNA", "SMA"],
      description: "Dr. Louiza Boulasbaa is a renowned dermatologist specializing in skin conditions and cosmetic dermatology. She has a passion for helping her patients achieve healthy, glowing skin.",
      lat: 36.75, // Example latitude
      lon: 3.05,  // Example longitude
    },
    {
      id: 3,
      name: "Farah Kenar",
      specialization: "Pediatrician",
      location: "Rue Mustapha Ben Boulaid, Sidi Maarouf",
      fees: 500,
      rating: 4.6,
      reviews: 500,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbF3v6ZEvWOn0PgOjsbsthO06JsA&s",
      availability: {
        "2025-02-02": ["08:00 AM"],
        "2024-12-29": ["08:00 AM", "10:00 AM", "02:00 PM"],
        "2025-02-04": ["08:00 AM"]
      },
      insurance: ["AXA", "SMA"],
      description: "Dr. Farah Kenar is a pediatrician who has been dedicated to the health and well-being of children for over 10 years. She is known for her compassionate approach and ability to put children at ease during consultations.",
      lat: 36.75, // Example latitude
      lon: 3.07,  // Example longitude
    },
    {
      id: 4,
      name: "Lina Menaa",
      specialization: "Orthopedic Surgeon",
      location: "Rue El-Mouhafadh, Bejaia",
      fees: 350,
      rating: 4.7,
      reviews: 1120,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEry1FIDXr2v6ZEvWOn0PgOjsbsthO06JsA&s",
      availability: {
        "2024-12-28": ["08:00 AM"],
        "2025-02-09": ["08:00 AM", "10:00 AM", "02:00 PM"],
        "2024-12-30": ["08:00 AM", "10:00 AM", "02:00 PM"]
      },
      insurance: ["CNA", "Allianz"],
      description: "Dr. Lina Menaa is an orthopedic surgeon with extensive experience in treating bone and joint issues. She specializes in sports injuries, joint replacements, and fractures.",
      lat: 36.75, // Example latitude
      lon: 3.10,  // Example longitude
    },
    {
      id: 5,
      name: "Fatima Zohra Haddad",
      specialization: "Gynecologist",
      location: "Rue Abdelkader Ouled Ali, Constantine",
      fees: 450,
      rating: 4.9,
      reviews: 765,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEry1FIDXr2v6ZEvWOn0PgOjsbsthO06JsA&s",
      availability: {
        "2024-12-28": ["08:00 AM"],
        "2024-12-29": ["08:00 AM", "10:00 AM", "02:00 PM"],
        "2024-12-30": ["08:00 AM", "10:00 AM", "02:00 PM"]
      },
      insurance: ["AXA", "SMA", "Allianz"],
      description: "Dr. Fatima Zohra Haddad is a skilled gynecologist who offers personalized care for women’s health, specializing in family planning, prenatal care, and menopause management.",
      lat: 36.70, // Example latitude
      lon: 3.05,  // Example longitude
    },
    {
      id: 6,
      name: "Mohamed Rachedi",
      specialization: "Neurologist",
      location: "Rue Belouizdad, Tizi Ouzou",
      fees: 550,
      rating: 4.6,
      reviews: 890,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEry1FIDXr2v6ZEvWOn0PgOjsbsthO06JsA&s",
      availability: {
        "2024-12-30": ["02:00 PM"]
      },
      insurance: ["CNA", "AXA"],
      description: "Dr. Mohamed Rachedi is a neurologist specializing in the diagnosis and treatment of disorders affecting the brain and nervous system. He has a wealth of experience with conditions like migraines, epilepsy, and stroke.",
      lat: 36.77, // Example latitude
      lon: 3.01,  // Example longitude
    },
    {
      id: 7,
      name: "Amira Boumediene",
      specialization: "Dentist",
      location: "Rue de la Liberté, Algiers",
      fees: 200,
      rating: 4.8,
      reviews: 1300,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEry1FIDXr2v6ZEvWOn0PgOjsbsthO06JsA&s",
      availability: {
        "2024-12-28": ["08:00 AM"],
        "2024-12-30": ["08:00 AM", "10:00 AM"]
      },
      insurance: ["Allianz", "SMA"],
      description: "Dr. Amira Boumediene is a dentist known for her expertise in cosmetic dentistry, teeth whitening, and preventive care. She is committed to ensuring her patients maintain optimal oral health.",
      lat: 36.75, // Example latitude
      lon: 3.06,  // Example longitude
    },
    {
      id: 8,
      name: "Yassir Rahmoune",
      specialization: "General Practitioner",
      location: "Rue Abane Ramdane, Oran",
      fees: 300,
      rating: 4.3,
      reviews: 650,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfEry1FIDXr2v6ZEvWOn0PgOjsbsthO06JsA&s",
      availability: {
        "2024-12-28": ["08:00 AM"],
      },
      insurance: ["AXA", "CNA"],
      description: "Dr. Yassir Rahmoune is a general practitioner who provides primary care services. He is dedicated to diagnosing and treating a wide range of medical conditions, offering preventative and holistic care.",
      lat: 36.75, // Example latitude
      lon: 3.04,  // Example longitude
    },
  ];
  
